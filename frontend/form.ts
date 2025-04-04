const language = document.documentElement.lang;
const form = document.getElementById("contact-form") as HTMLFormElement;
const output = document.getElementById(
  "contact-form-output",
) as HTMLOutputElement;

type FormState = "idle" | "invalid" | "submitting";

function getFormState(): FormState {
  const { state } = form.dataset;

  switch (state) {
    case "invalid":
    case "submitting":
      return state;
    default:
      return "idle";
  }
}

function setFormState(state: FormState) {
  if (state === "idle") {
    delete form.dataset.state;
  } else {
    form.dataset.state = state;
  }
}

function setOutput(message: string, type: "error" | "info" | "success") {
  output.hidden = false;
  output.className = `output output-${type}`;
  output.textContent = message;
}

function clearOutput() {
  output.hidden = true;
  output.className = "output";
  output.textContent = "";
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

async function sendForm() {
  if (getFormState() === "submitting") return;

  setFormState("submitting");
  setOutput(
    language === "fi" ? "Viestiäsi lähetetään…" : "Your message is being sent…",
    "info",
  );

  let response: Response;

  try {
    [response] = await Promise.all([
      fetch(form.action, {
        body: new FormData(form),
        method: form.method,
        signal: AbortSignal.timeout(30_000),
      }),
      wait(1000),
    ]);
  } catch (e) {
    console.error(e);
    setOutput(
      language === "fi"
        ? "Viestin lähettäminen ei onnistunut verkkovirheen takia. Kokeile myöhemmin uudelleen."
        : "Sending message failed due to a network error. You can try again later.",
      "error",
    );
    return;
  } finally {
    setFormState("idle");
  }

  if (response.ok) {
    setOutput(
      language === "fi" ? "Kiitos viestistäsi!" : "Thank you for your message!",
      "success",
    );
    form.reset();
  } else {
    console.error(
      `Form action returned error status ${response.status} with message: "${await response.text()}". Response: %o`,
      response,
    );

    if (response.status === 400) {
      setOutput(
        language === "fi"
          ? "Viestin lähettäminen ei onnistunut. Tarkista, että kaikki kentät on täytetty oikein."
          : "Sending message didn’t succeed. Please check that all fields are filled correctly.",
        "error",
      );
    } else {
      setOutput(
        language === "fi"
          ? "Viestin lähettäminen ei onnistunut. Kokeile myöhemmin uudelleen."
          : "Sending message didn’t succeed. Please try again later.",
        "error",
      );
    }
  }
}

function onSubmit(event: SubmitEvent) {
  event.preventDefault();
  sendForm();
}

function onInvalid(event: Event) {
  if (getFormState() === "invalid") return;

  setFormState("invalid");

  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  if (target.name === "message") {
    setOutput(
      language === "fi" ? "Viesti puuttuu." : "The message is missing.",
      "error",
    );
  } else if (target.name === "email") {
    setOutput(
      language === "fi"
        ? "Antamassasi meiliosoitteessa on ongelma."
        : "There’s a problem with the email address you gave.",
      "error",
    );
  } else {
    setOutput(
      language === "fi"
        ? "Korjaathan lomakkeessa olevat virheet."
        : "Please correct the errors in the form.",
      "error",
    );
  }
}

function onInput() {
  setFormState("idle");
  clearOutput();
}

form.addEventListener("submit", onSubmit);
form.addEventListener("invalid", onInvalid, { capture: true, passive: true });
form.addEventListener("input", onInput, { passive: true });
