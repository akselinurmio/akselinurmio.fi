const language = document.documentElement.lang;
const form = document.getElementById("contact-form") as HTMLFormElement;
const output = document.getElementById(
  "contact-form-output",
) as HTMLOutputElement;

const submitStateKey = "submitting";

const isSubmitting = () => submitStateKey in form.dataset;

const setIsSubmitting = () => {
  form.dataset[submitStateKey] = "";
};

const clearSubmitState = () => {
  delete form.dataset[submitStateKey];
};

const setOutput = (message: string, type: "error" | "info" | "success") => {
  output.hidden = false;
  output.className = `output output-${type}`;
  output.textContent = message;
};

const clearOutput = () => {
  output.hidden = true;
  output.className = "output";
  output.textContent = "";
};

const sendForm = async () => {
  if (isSubmitting()) return;

  setIsSubmitting();
  setOutput(
    language === "fi" ? "Viestiäsi lähetetään…" : "Your message is being sent…",
    "info",
  );

  let response: Response;

  try {
    response = await fetch(form.action, {
      body: new FormData(form),
      method: form.method,
    });
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
    clearSubmitState();
  }

  if (response.ok) {
    setOutput(
      language === "fi" ? "Kiitos viestistäsi!" : "Thank you for your message!",
      "success",
    );
    form.reset();
  } else {
    console.error(
      `Form action returned error status ${response.status} with message: "%s". Response: %o`,
      await response.text(),
      response,
    );
    setOutput(
      language === "fi"
        ? "Viestin lähettäminen ei onnistunut. Kokeile myöhemmin uudelleen."
        : "Sending message didn’t succeed. Please try again later.",
      "error",
    );
  }
};

const onSubmit = (event: SubmitEvent) => {
  event.preventDefault();

  sendForm().catch((e) => {
    console.error(e, "Error occurred while sending the form");
  });
};

const onInvalid = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  if (target.name === "message" && target.validity.valueMissing) {
    setOutput(
      language === "fi" ? "Viesti puuttuu." : "The message is missing.",
      "error",
    );
  } else if (target.name === "email" && target.validity.typeMismatch) {
    setOutput(
      language === "fi"
        ? "Antamassasi meiliosoitteessa on ongelma."
        : "There’s a problem with the email address you gave.",
      "error",
    );
  }
};

const onInput = () => {
  clearOutput();
};

form.addEventListener("submit", onSubmit);
form.addEventListener("invalid", onInvalid, { capture: true });
form.addEventListener("input", onInput);
