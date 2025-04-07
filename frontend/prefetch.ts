function prefetchLink(targetUrl: string): void {
  const linkElement = document.createElement("link");
  linkElement.rel = "prefetch";
  linkElement.href = targetUrl;

  document.head.appendChild(linkElement);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target instanceof HTMLAnchorElement) {
      const anchorElement = entry.target;

      if (anchorElement.origin === window.location.origin) {
        prefetchLink(anchorElement.href);
      }

      observer.unobserve(anchorElement);
    }
  });
});

const anchorElements = document.querySelectorAll("a");

anchorElements.forEach((anchor) => {
  observer.observe(anchor);
});
