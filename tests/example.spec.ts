import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";

test("Senario 1: Sucessful login with a valid user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const loginPage = new LoginPage(page);

  /* WHEN I type "standard_user" in "Username" */
  await loginPage.inputUsername("standard_user");
  /* And I type "secret_sauce" in "Password" */
  await loginPage.inputPassword("secret_sauce");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I shouldn't see "Login" */
  await expect(page.getByText("Login")).toHaveCount(0);
  /* And I should see "Products" */
  await expect(page.getByText("Products")).not.toHaveCount(0);
});
