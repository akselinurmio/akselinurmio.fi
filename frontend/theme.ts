function setThemeOverride(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
}

function init() {
  const switchWrapper = document.getElementById(
    "theme-switch-wrapper",
  ) as HTMLElement;
  const checkbox = document.getElementById(
    "theme-switch-checkbox",
  ) as HTMLInputElement;

  const isDarkThemeDefaultQuery = window.matchMedia(
    "(prefers-color-scheme: dark)",
  );

  const onDarkThemePreferenceChange = (event: MediaQueryListEvent) => {
    checkbox.checked = event.matches;
  };

  isDarkThemeDefaultQuery.addEventListener(
    "change",
    onDarkThemePreferenceChange,
  );

  checkbox.checked = isDarkThemeDefaultQuery.matches;
  checkbox.addEventListener("change", () => {
    setThemeOverride(checkbox.checked ? "dark" : "light");
    isDarkThemeDefaultQuery.removeEventListener(
      "change",
      onDarkThemePreferenceChange,
    );
  });

  switchWrapper.hidden = false;
}

init();
