(async () => {
  if (!navigator.serviceWorker) return;

  const registrations = await navigator.serviceWorker.getRegistrations();

  for (const registration of registrations) {
    registration.unregister();
  }
})();
