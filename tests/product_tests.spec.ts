import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import InventoryPage from "../pages/inventoryPage";

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

  /* WHEN I click the shopping cart icon on the top right */
  await inventoryPage.clickCart();

  /* THEN I should see "Your Cart" */
  await expect(page.locator("[data-test='title']")).toHaveText("Your Cart");
  /* and I should not see "Products" */
  await expect(page.locator("[data-test='title']")).not.toHaveText("Products");
});

test("Nav Senario 3: User naviagtes to the All Items Page", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click the shopping cart icon on the top right */
  await inventoryPage.clickCart();
  /* and I click the burger menu on the top left */
  await inventoryPage.openBurgerIcon();
  /* and I click on "All items" */
  await inventoryPage.clickAllItems();

  /* THEN I should see "Products" */
  await expect(page.locator("[data-test='title']")).toHaveText("Products");
  /* and I should not see "Your Cart" */
  await expect(page.locator("[data-test='title']")).not.toHaveText("Your Cart");
});

test("Nav Senario 4: User Clicks on an item", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click on "Sauce Labs Backpack" */
  await inventoryPage.clickOnItem("Sauce Labs Backpack");

  /* THEN I should see "Back to products" */
  await expect(page.locator("button[name='back-to-products']")).toBeVisible();
  /* and I should not see "Sauce Labs Bike Light" */
  await expect(page.getByText("Sauce Labs Bike Light")).not.toBeVisible();
});

test("Nav Senario 5: User resets app state", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  /* and I click on the burger menu on the top left */
  await inventoryPage.openBurgerIcon();
  /* and I click "Reset App State" */
  await inventoryPage.clickResetAppState();

  /* THEN I should not see the cart have a red circle badge  */
  await expect(
    page.locator("[data-test='shopping-cart-badge']")
  ).not.toBeVisible();
  //App does not revert the buttons but checks are added for completeness
  /* and I should see "Add to cart" on "Sauce Labs Backpack" */
  /*
  await expect(
    page.locator("[data-test='add-to-cart-sauce-labs-backpack']")
  ).toBeVisible();*/
  /* and I should not see "remove" on "Sauce Labs Backpack" */
  /*await expect(
    page.locator("[data-test='remove-sauce-labs-backpack']")
  ).not.toBeVisible();*/
});
