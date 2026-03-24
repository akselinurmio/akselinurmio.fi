import { test, expect } from "@playwright/test";

test.describe("Page metadata checks", () => {
  test.describe.configure({ mode: "parallel" });

  test("Finnish homepage has correct metadata", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Akseli Nurmio");

    const canonicalLink = page.locator('link[rel="canonical"]');
    await expect(canonicalLink).toHaveAttribute(
      "href",
      "https://akselinurmio.fi/",
    );

    await expect(page.locator('link[rel="alternate"]')).toHaveCount(2);
    await expect(
      page.locator('link[rel="alternate"][hreflang="fi"]'),
    ).toHaveAttribute("href", "https://akselinurmio.fi");
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveAttribute("href", "https://akselinurmio.fi/en/");
  });

  test("English homepage has correct metadata", async ({ page }) => {
    await page.goto("/en/");

    await expect(page).toHaveTitle("Akseli Nurmio");

    const canonicalLink = page.locator('link[rel="canonical"]');
    await expect(canonicalLink).toHaveAttribute(
      "href",
      "https://akselinurmio.fi/en/",
    );

    const alternateLinks = page.locator('link[rel="alternate"]');
    await expect(alternateLinks).toHaveCount(2);
    await expect(
      page.locator('link[rel="alternate"][hreflang="fi"]'),
    ).toHaveAttribute("href", "https://akselinurmio.fi");
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveAttribute("href", "https://akselinurmio.fi/en/");
  });

  test("Finnish 404 page has correct metadata", async ({ page }) => {
    await page.goto("/404.html");

    await expect(page).toHaveTitle("Sivua ei löytynyt");

    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute("content", "noindex");
  });
});
