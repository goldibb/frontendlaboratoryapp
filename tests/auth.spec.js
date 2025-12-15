const { test, expect } = require("@playwright/test");

const USER_EMAIL = "grzmot3012@gmail.com";
const USER_PASSWORD = "haslo123";

test("unauthenticated user is redirected to login page when accessing profile", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/user/profile");
  await expect(page).toHaveURL(/.*\/user\/signin/);
  await expect(page.locator("h1")).toContainText("Sign in");
});

test("authenticated user can access profile", async ({ page }) => {
  await page.goto("http://localhost:3000/user/signin");

  await page.fill('input[name="email"]', USER_EMAIL);
  await page.fill('input[name="password"]', USER_PASSWORD);

  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("http://localhost:3000/");

  await page.click("header >> text=Account");
  await expect(page).toHaveURL("http://localhost:3000/user/profile");

  await expect(page.locator("h1")).toContainText("User Profile");
});
