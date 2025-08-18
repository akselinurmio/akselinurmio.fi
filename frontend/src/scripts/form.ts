const language = document.documentElement.lang;
const form = document.getElementById("contact-form") as HTMLFormElement;
const submitButton = document.getElementById(
  "submit-button",
) as HTMLButtonElement;
const output = document.getElementById(
  "contact-form-output",
) as HTMLOutputElement;
const turnstileWidget = document.getElementById("turnstile-widget");

let turnstileWidgetId: string | null | undefined;

type FormState = "idle" | "invalid" | "submitting" | "success" | "error";

interface FormStatus {
  state: FormState;
  message?: string;
}

const messages = {
  fi: {
    sending: "Viestiäsi lähetetään…",
    networkError:
      "Viestin lähettäminen ei onnistunut verkkovirheen takia. Kokeile myöhemmin uudelleen.",
    success: "Kiitos viestistäsi!",
    validationError:
      "Viestin lähettäminen ei onnistunut. Tarkista, että kaikki kentät on täytetty oikein.",
    serverError:
      "Viestin lähettäminen ei onnistunut. Kokeile myöhemmin uudelleen.",
    missingMessage: "Viesti puuttuu.",
    emailError: "Antamassasi meiliosoitteessa on ongelma.",
    formError: "Korjaathan lomakkeessa olevat virheet.",
  },
  en: {
    sending: "Your message is being sent…",
    networkError:
      "Sending message failed due to a network error. You can try again later.",
    success: "Thank you for your message!",
    validationError:
      "Sending message didn't succeed. Please check that all fields are filled correctly.",
    serverError: "Sending message didn't succeed. Please try again later.",
    missingMessage: "The message is missing.",
    emailError: "There's a problem with the email address you gave.",
    formError: "Please correct the errors in the form.",
  },
} as const;

function initializeTurnstile(): void {
  try {
    if (!turnstileWidget) {
      throw new Error("Turnstile widget container not found");
    }

    if (typeof turnstile === "undefined") {
      throw new Error("Turnstile API not available");
    }

    const action = language === "fi" ? "contact_fi" : "contact_en";
    const turnstileLanguage = language === "fi" ? "fi" : "en";

    turnstileWidgetId = turnstile.render(turnstileWidget, {
      sitekey: "0x4AAAAAAAB4pAL3vK_V47rO",
      action,
      language: turnstileLanguage,
      theme: "light",
      callback: () => {
        if (getFormState() === "error") {
          setFormState({ state: "idle" });
        }
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function getFormState(): FormState {
  return (form.dataset.state as FormState) || "idle";
}

function setFormState(formStatus: FormStatus): void {
  const { state, message } = formStatus;

  form.dataset.state = state;

  if (state === "submitting") {
    submitButton.setAttribute("aria-disabled", "true");
  } else {
    submitButton.removeAttribute("aria-disabled");
  }

  if (message) {
    output.hidden = false;
    output.className = `output output-${state}`;
    output.textContent = message;
  } else {
    output.hidden = true;
    output.className = "output";
    output.textContent = "";
  }
}

function getMessage(key: keyof typeof messages.fi): string {
  return messages[language as keyof typeof messages][key];
}

function createTimeoutSignal(): AbortSignal | undefined {
  return typeof AbortSignal !== "undefined" && AbortSignal.timeout
    ? AbortSignal.timeout(30_000)
    : undefined;
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function sendForm(): Promise<void> {
  if (getFormState() === "submitting") return;

  setFormState({ state: "submitting", message: getMessage("sending") });

  try {
    const [response] = await Promise.all([
      fetch(form.action, {
        body: new (URLSearchParams as unknown as {
          new (f: FormData): URLSearchParams;
        })(new FormData(form)),
        method: form.method,
        signal: createTimeoutSignal(),
      }),
      wait(1000),
    ]);

    if (response.ok) {
      setFormState({ state: "success", message: getMessage("success") });
      form.reset();

      if (turnstileWidgetId) {
        turnstile.reset(turnstileWidgetId);
      }
    } else {
      console.error(
        `Form action returned error status ${response.status} with message: "${await response.text()}".`,
      );

      const errorMessage =
        response.status === 400
          ? getMessage("validationError")
          : getMessage("serverError");

      setFormState({ state: "error", message: errorMessage });
    }
  } catch (error) {
    console.error(error);
    setFormState({ state: "error", message: getMessage("networkError") });
  }
}

function onSubmit(event: SubmitEvent): void {
  event.preventDefault();
  sendForm();
}

function onInvalid(event: Event): void {
  const { target } = event;

  if (!isFormInput(target)) {
    throw new Error(
      "Invalid event target: expected HTMLInputElement or HTMLTextAreaElement",
    );
  }

  if (getFormState() === "invalid") return;

  let message: string;

  if (target.id === "message-input" && !target.value) {
    message = getMessage("missingMessage");
  } else if (target.id === "email-input") {
    message = getMessage("emailError");
  } else {
    message = getMessage("formError");
  }

  setFormState({ state: "invalid", message });
}

function isFormInput(
  element: EventTarget | null,
): element is HTMLInputElement | HTMLTextAreaElement {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  );
}

function onInput(): void {
  setFormState({ state: "idle" });
}

initializeTurnstile();

form.addEventListener("submit", onSubmit);
form.addEventListener("invalid", onInvalid, true);
form.addEventListener("input", onInput);
