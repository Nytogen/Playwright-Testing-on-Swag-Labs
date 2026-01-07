import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  /* GIVEN I am logged in as standard_user */

  await loginPage.loginFull("standard_user", "secret_sauce");

  /* and I am on the Inventory Page */
});

//Feature: Logout
test("Logout Senario 1: user decides to logout", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click the burger menu on the top left */
  await inventoryPage.openBurgerIcon();
  /* and I click on "Logout" */
  await inventoryPage.clickLogout();

  /* THEN I should see "Login" */
  await expect(page.locator("[data-test='login-button']")).toHaveText("Login");
  /* and I shouldn't see "Products" */
  await expect(page.getByText("Products")).not.toBeVisible();
});

//Feature: Naviagtion
test("Nav Senario 1: User navigates to the About Page", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click the burger menu on the top left */
  await inventoryPage.openBurgerIcon();
  /* and I click on "About" */
  await inventoryPage.clickAbout();

  /* THEN I should be direct to the site "https://saucelabs.com" */
  await expect(page).toHaveURL("https://saucelabs.com/");
});

test("Nav Senario 2: User navigates to the Cart Page", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click the burger menu on the top left */
  await inventoryPage.openBurgerIcon();
  /* and I click on "About" */
  await inventoryPage.clickCart();

  /* THEN I should see "Your Cart" */
  await expect(page.locator("[data-test='title']")).toHaveText("Your Cart");
  /* and I should not see "Products" */
  await expect(page.locator("[data-test='title']")).not.toHaveText("Products");
});
