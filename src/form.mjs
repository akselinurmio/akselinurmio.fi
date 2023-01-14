const language = document.documentElement.lang;
/** @type {HTMLFormElement} */
const form = document.querySelector("#contact-form");
/** @type {HTMLOutputElement} */
const output = document.querySelector("#contact-form-output");

const isSubmitting = () => "submitting" in form.dataset;

const setIsSubmitting = () => {
  form.dataset.submitting = "";
};

const clearSubmitState = () => {
  delete form.dataset.submitting;
};

/**
 * @param {string} message
 * @param {"error" | "info" | "success"} type
 */
const setOutput = (message, type) => {
  output.hidden = false;
  output.className = type;
  output.textContent = message;
};

const clearOutput = () => {
  output.hidden = true;
  output.className = "";
  output.textContent = "";
};

const sendForm = async () => {
  if (isSubmitting()) {
    return;
  } else {
    setIsSubmitting();
  }

  setOutput(
    language === "fi" ? "Viestiäsi lähetetään…" : "Your message is being sent…",
    "info"
  );

  let response;

  try {
    response = await fetch(form.action, {
      body: new URLSearchParams(new FormData(form)),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
  } catch (e) {
    console.error("Fetch error", e);
    setOutput(
      language === "fi"
        ? "Viestin lähettäminen ei onnistunut verkkovirheen takia. Kokeile myöhemmin uudelleen."
        : "Sending message failed due to a network error. You can try again later.",
      "error"
    );
    return;
  } finally {
    clearOutput();
    clearSubmitState();
  }

  if (response.ok) {
    setOutput(
      language === "fi" ? "Kiitos viestistäsi!" : "Thank you for your message!",
      "success"
    );
    form.reset();
  } else {
    const errorMessage = await response.text();

    console.error(
      `Form action returned error status ${response.status} ${
        response.statusText
      }${errorMessage ? ` with message: "${errorMessage}"` : ""}`
    );
    setOutput(
      language === "fi"
        ? "Viestin lähettäminen ei onnistunut. Kokeile myöhemmin uudelleen."
        : "Sending message didn’t succeed. Please try again later.",
      "error"
    );
  }
};

/** @param {SubmitEvent} event */
const onSubmit = (event) => {
  event.preventDefault();

  sendForm().catch((e) => {
    console.error("Unexpected error while sending form", e);
  });
};

/** @param {Event} event */
const onInvalid = (event) => {
  /** @type {HTMLInputElement | HTMLTextAreaElement} */
  const target = event.target;

  if (target.name === "message" && target.validity?.valueMissing) {
    setOutput(
      language === "fi" ? "Viesti puuttuu." : "The message is missing.",
      "error"
    );
  } else if (target.type === "email" && target.validity?.typeMismatch) {
    setOutput(
      language === "fi"
        ? "Antamassasi meiliosoitteessa on ongelma."
        : "There’s a problem with the email address you gave.",
      "error"
    );
  }
};

const onChange = () => {
  clearOutput();
};

if (form) {
  form.addEventListener("submit", onSubmit);
  form.addEventListener("invalid", onInvalid, { capture: true });
  form.addEventListener("change", onChange);
}
