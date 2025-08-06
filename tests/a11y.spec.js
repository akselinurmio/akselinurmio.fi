import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

test.describe("Accessibility checks", () => {
  test.describe.configure({ mode: "parallel" });

  ["/", "/en/", "/en/technical/", "/404.html", "/en/404.html"].forEach(
    (path) => {
      test(`Page ${path} should have no accessibility violations`, async ({
        page,
      }) => {
        await page.goto(path);

        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    },
  );
});
