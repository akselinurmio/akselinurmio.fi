function activate90sStylesheet() {
  const defaultStylesheet = document.getElementById(
    "main-stylesheet",
  ) as HTMLLinkElement;
  defaultStylesheet.disabled = true;

  const alternateStylesheet = document.getElementById(
    "ninetees-stylesheet",
  ) as HTMLLinkElement;
  alternateStylesheet.disabled = false;
}

function initialize90sSwitch() {
  const button = document.getElementById("to-90s") as HTMLButtonElement;

  button.hidden = false;

  button.addEventListener("click", () => {
    activate90sStylesheet();
    button.hidden = true;
  });
}

function start90sTimer() {
  setTimeout(initialize90sSwitch, 10_000);
}

window.addEventListener("load", start90sTimer);
