const acceptablePaths = new Set(["/", "/index.html"]);

export function onRequest(context) {
  const { request, functionPath: path, next } = context;
  const { headers } = request;
  const { country } = request.cf;

  if (acceptablePaths.has(path)) {
    const clientLocales = headers.get("Accept-Language");
    const clientAcceptsFinnish = clientLocales && clientLocales.includes("fi");
    const clientIpIsFinnish = country === "FI";

    const language = clientAcceptsFinnish || clientIpIsFinnish ? "fi" : "en";

    return new Response(null, {
      status: 301,
      headers: {
        "Cache-Control": "no-store",
        Location: `/${language}/`,
        Vary: "Accept-Language",
      },
    });
  }

  return next();
}
