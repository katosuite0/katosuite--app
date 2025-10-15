import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility tests", () => {
  test("homepage should not have accessibility violations", async ({ page }) => {
    await page.goto("/en");
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("pricing page should not have accessibility violations", async ({ page }) => {
    await page.goto("/en/pricing");
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("Pricing page", () => {
  test("should display plans from config", async ({ page }) => {
    await page.goto("/en/pricing");
    
    await expect(page.locator("text=Choose Your Plan")).toBeVisible();
    await expect(page.locator("text=Free")).toBeVisible();
    await expect(page.locator("text=Starter+")).toBeVisible();
    await expect(page.locator("text=Pro")).toBeVisible();
  });
});
