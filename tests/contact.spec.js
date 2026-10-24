import { test, expect } from "@playwright/test";

const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js*";

const turnstileStub = `window.turnstile = {
  render: () => "test-widget",
  getResponse: () => "test-token",
  reset: () => {},
};`;

test.describe("Contact form", () => {
  test.describe.configure({ mode: "parallel" });

  test.beforeEach(async ({ page }) => {
    await page.route(TURNSTILE_SCRIPT, (route) =>
      route.fulfill({ contentType: "text/javascript", body: turnstileStub }),
    );
    await page.goto("/");
  });

  test("shows validation error for empty required fields", async ({ page }) => {
    const form = page.getByRole("form", { name: "Laita viestiä" });
    const submitButton = form.getByRole("button", { name: "Lähetä" });
    const output = page.getByRole("status");

    await submitButton.click();

    await expect(output).toBeVisible();
    await expect(output).toHaveText(/Viesti puuttuu/);
  });

  test("shows validation error for invalid email", async ({ page }) => {
    const form = page.getByRole("form", { name: "Laita viestiä" });
    const emailInput = form.getByLabel("Meiliosoitteesi");
    const submitButton = form.getByRole("button", { name: "Lähetä" });
    const output = page.getByRole("status");

    await emailInput.fill("invalid-email");
    await submitButton.click();

    await expect(output).toBeVisible();
    await expect(output).toHaveText(/meiliosoitteessa on ongelma/);
  });

  test("clears error message when user starts typing", async ({ page }) => {
    const form = page.getByRole("form", { name: "Laita viestiä" });
    const messageInput = form.getByLabel("Viestisi");
    const submitButton = form.getByRole("button", { name: "Lähetä" });
    const output = page.getByRole("status");

    await submitButton.click();
    await expect(output).toBeVisible();

    await messageInput.fill("test");
    await expect(output).toBeHidden();
  });

  test("shows loading state during submission", async ({ page }) => {
    const form = page.getByRole("form", { name: "Laita viestiä" });
    const messageInput = form.getByLabel("Viestisi");
    const submitButton = form.getByRole("button", { name: "Lähetä" });

    await messageInput.fill("test message");

    await submitButton.click();

    await expect(submitButton).toHaveAttribute("aria-disabled", "true");
  });

  test("stays in loading state when input fires during submission", async ({
    page,
  }) => {
    await page.route("/message", () => {}); // Never respond

    const form = page.getByRole("form", { name: "Laita viestiä" });
    const messageInput = form.getByLabel("Viestisi");
    const submitButton = form.getByRole("button", { name: "Lähetä" });
    const output = page.getByRole("status");

    await messageInput.fill("test message");

    await submitButton.click();

    await expect(submitButton).toHaveAttribute("aria-disabled", "true");

    await messageInput.dispatchEvent("input");

    await expect(submitButton).toHaveAttribute("aria-disabled", "true");
    await expect(output).toHaveText(/Viestiäsi lähetetään/);
  });

  test("tells the user when Turnstile hasn't produced a token yet", async ({
    page,
  }) => {
    await page.evaluate(() => {
      window.turnstile.getResponse = () => undefined;
    });
    let requestSent = false;
    await page.route("/message", (route) => {
      requestSent = true;
      return route.fulfill();
    });

    const form = page.getByRole("form", { name: "Laita viestiä" });
    const messageInput = form.getByLabel("Viestisi");
    const submitButton = form.getByRole("button", { name: "Lähetä" });
    const output = page.getByRole("status");

    await messageInput.fill("test message");

    await submitButton.click();

    await expect(output).toHaveText(/Bottitarkistus on vielä kesken/);
    expect(requestSent).toBe(false);
  });

  test("tells the user when Turnstile fails to load", async ({ page }) => {
    await page.route(TURNSTILE_SCRIPT, (route) => route.abort());
    await page.reload();

    const form = page.getByRole("form", { name: "Laita viestiä" });
    const messageInput = form.getByLabel("Viestisi");
    const submitButton = form.getByRole("button", { name: "Lähetä" });
    const output = page.getByRole("status");

    await messageInput.fill("test message");

    await submitButton.click();

    await expect(output).toHaveText(/Bottitarkistus ei latautunut/);
  });

  test("tells the user when the server rejects the Turnstile token", async ({
    page,
  }) => {
    await page.route("/message", (route) => route.fulfill({ status: 403 }));

    const form = page.getByRole("form", { name: "Laita viestiä" });
    const messageInput = form.getByLabel("Viestisi");
    const submitButton = form.getByRole("button", { name: "Lähetä" });
    const output = page.getByRole("status");

    await messageInput.fill("test message");

    await submitButton.click();

    await expect(output).toHaveText(/Bottitarkistus epäonnistui/);
  });

  test("handles network error gracefully", async ({ page }) => {
    await page.route("/message", (route) => route.abort());

    const form = page.getByRole("form", { name: "Laita viestiä" });
    const messageInput = form.getByLabel("Viestisi");
    const submitButton = form.getByRole("button", { name: "Lähetä" });
    const output = page.getByRole("status");

    await messageInput.fill("test message");

    await submitButton.click();

    await expect(output).toBeVisible();
    await expect(output).toHaveText(/verkkovirheen takia/);
  });

  test("resets form after successful submission", async ({ page }) => {
    await page.route("/message", (route) => route.fulfill());

    const form = page.getByRole("form", { name: "Laita viestiä" });
    const nameInput = form.getByLabel("Nimesi");
    const emailInput = form.getByLabel("Meiliosoitteesi");
    const messageInput = form.getByLabel("Viestisi");
    const submitButton = form.getByRole("button", { name: "Lähetä" });
    const output = page.getByRole("status");

    await nameInput.fill("Test User");
    await emailInput.fill("test@example.com");
    await messageInput.fill("test message");

    await submitButton.click();

    await expect(output).toBeVisible();
    await expect(output).toHaveText(/Kiitos viestistäsi/);

    await expect(nameInput).toHaveValue("");
    await expect(emailInput).toHaveValue("");
    await expect(messageInput).toHaveValue("");
  });
});
