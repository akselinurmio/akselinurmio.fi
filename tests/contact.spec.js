import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.describe.configure({ mode: "parallel" });

  test.beforeEach(async ({ page }) => {
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
