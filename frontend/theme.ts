function setThemeOverride(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
}

function init() {
  const switchWrapper = document.getElementById(
    "theme-switch-wrapper",
  ) as HTMLElement;
  const darkThemePreferredCheckbox = document.getElementById(
    "theme-switch-checkbox",
  ) as HTMLInputElement;

  const isDarkThemeDefaultQuery = window.matchMedia(
    "(prefers-color-scheme: dark)",
  );

  const setDarkThemePreferenceCheckboxValue = () => {
    darkThemePreferredCheckbox.checked = isDarkThemeDefaultQuery.matches;
  };

  isDarkThemeDefaultQuery.addEventListener(
    "change",
    setDarkThemePreferenceCheckboxValue,
  );

  setDarkThemePreferenceCheckboxValue();

  darkThemePreferredCheckbox.addEventListener("change", () => {
    setThemeOverride(darkThemePreferredCheckbox.checked ? "dark" : "light");
    isDarkThemeDefaultQuery.removeEventListener(
      "change",
      setDarkThemePreferenceCheckboxValue,
    );
  });

  switchWrapper.hidden = false;
}

init();
