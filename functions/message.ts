import { z } from "zod";

declare var URL: {
  canParse(url: string): boolean;
  prototype: URL;
};

type Env = Record<(typeof ENV_KEYS)[number], string>;

const ENV_KEYS = [
  "CONTACT_EMAIL",
  "RESEND_API_KEY",
  "TURNSTILE_SECRET_KEY",
] as const;

function isEnv(env: Record<string, unknown>): env is Env {
  return ENV_KEYS.every((key) => key in env);
}

const clientError = (message = "Client error") =>
  new Response(message, { status: 400 });

const genericError = () => new Response("Server error", { status: 500 });

const turnstileResponseSchema = z.object({
  success: z.boolean(),
  "error-codes": z.array(z.string()).default([]),
});

const contactMessageSchema = z.object({
  senderName: z
    .string()
    .max(100, "Name is too long")
    .regex(/^[^\n]*$/, "Name contains newlines")
    .nullable(),
  senderEmail: z
    .email("Email is invalid")
    .max(254, "Email address is too long")
    .or(z.literal(""))
    .nullable(),
  message: z
    .string("Message is missing")
    .trim()
    .nonempty("Message is missing")
    .max(2000, "Message is too long"),
  referer: z.httpUrl("Invalid referer").nullable(),
});

async function validateTurnstileToken(
  formData: FormData,
  headers: Headers,
  secretKey: string,
): Promise<boolean> {
  const token = formData.get("cf-turnstile-response");
  const ip = headers.get("CF-Connecting-IP");

  if (!token || token.length > 2048 || !ip) {
    return false;
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );

  const { success, "error-codes": errors } = turnstileResponseSchema.parse(
    await response.json(),
  );

  if (errors.length > 0) {
    console.log(
      "Turnstile validation returned with following errors: " +
        errors.join(", "),
    );
  }
  return success;
}

export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== "POST") {
    return new Response("Only POST requests", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }

  if (!isEnv(context.env)) {
    console.error("Environment variables missing");
    return genericError();
  }
  const { CONTACT_EMAIL, RESEND_API_KEY, TURNSTILE_SECRET_KEY } = context.env;
  const { headers } = context.request;

  let formData: FormData;
  try {
    formData = await context.request.formData();
  } catch (e) {
    console.log(e);
    return clientError("Invalid form data");
  }

  const isTurnstileTokenValid = await validateTurnstileToken(
    formData,
    headers,
    TURNSTILE_SECRET_KEY,
  );

  if (!isTurnstileTokenValid) {
    return clientError("Invalid Turnstile token. Have you enabled JavaScript?");
  }

  let contactMessage: z.infer<typeof contactMessageSchema>;
  try {
    contactMessage = contactMessageSchema.parse({
      senderName: formData.get("name"),
      senderEmail: formData.get("email"),
      message: formData.get("message"),
      referer: headers.get("referer"),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return clientError(error.issues[0]?.message);
    }

    throw error;
  }

  const { senderName, senderEmail, message, referer } = contactMessage;

  const body = `Name: ${senderName || ""}
Email: ${senderEmail || ""}
Form: ${referer || "unknown"}

Message:
${message}`;

  const response = await fetch("https://api.resend.com/emails", {
    body: JSON.stringify({
      from: `"akselinurmio.fi" <noreply@notifications.akselinurmio.fi>`,
      to: CONTACT_EMAIL,
      subject: "Mail from website",
      text: body,
    }),
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (response.ok) {
    return new Response("OK");
  } else {
    const errorDescription = await response.text();
    console.error(
      `Sending email didn't succeed. Resend replied with HTTP ${response.status}. ${errorDescription}`,
    );
    return genericError();
  }
};
