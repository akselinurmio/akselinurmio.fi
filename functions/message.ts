type Env = Record<typeof ENV_KEYS[number], string>;

const ENV_KEYS = [
  "CONTACT_EMAIL",
  "SENDGRID_API_KEY",
  "TURNSTILE_SECRET_KEY",
] as const;

function isEnv(env: Record<string, unknown>): env is Env {
  return ENV_KEYS.every((key) => key in env);
}

const clientError = (message = "Client error") =>
  new Response(message + "\n", { status: 400 });

const genericError = () => new Response("Error\n", { status: 500 });

async function validateTurnstileToken(
  body: FormData,
  headers: Headers,
  secretKey: string
): Promise<boolean> {
  const token = body.get("cf-turnstile-response");
  const ip = headers.get("CF-Connecting-IP");

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
    }
  );

  type TurnstileResponse = { success: boolean; "error-codes": string[] };
  const outcome = await response.json<TurnstileResponse>();
  const { success, "error-codes": errors = [] } = outcome;

  if (errors.length > 0) {
    console.log(
      "Turnstile validation returned with following errors: " +
        errors.join(", ")
    );
  }
  return success;
}

async function sendMail() {}

export const onRequest: PagesFunction = async (context) => {
  if (context.request.method !== "POST") {
    return new Response("Only POST requests\n", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }

  if (!isEnv(context.env)) {
    console.error("Environment variables missing");
    return genericError();
  }
  const { CONTACT_EMAIL, SENDGRID_API_KEY, TURNSTILE_SECRET_KEY } = context.env;
  const { headers } = context.request;

  let body: FormData;
  try {
    body = await context.request.formData();
  } catch (e) {
    console.log(e);
    return clientError("Invalid form data");
  }

  const isTurnstileTokenValid = await validateTurnstileToken(
    body,
    headers,
    TURNSTILE_SECRET_KEY
  );

  if (!isTurnstileTokenValid) {
    return clientError("Invalid Turnstile token");
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    body: JSON.stringify({
      personalizations: [{ to: [{ email: CONTACT_EMAIL }] }],
      from: { email: "webmaster@akselinurmio.fi" },
      subject: "Mail from website",
      content: [{ type: "text/plain", value: "You've got mail!" }],
    }),
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (response.ok) {
    return new Response("OK");
  } else {
    const errorDescription = await response.text();
    console.error(
      `Sending email didn't succeed. SendGrid replied with HTTP ${response.status}.\n` +
        errorDescription
    );
    return genericError();
  }
};
