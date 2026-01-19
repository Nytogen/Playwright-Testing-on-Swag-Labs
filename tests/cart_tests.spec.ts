import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import InventoryPage from "../pages/inventoryPage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  /* GIVEN I am logged in as standard_user */

  await loginPage.loginFull("standard_user", "secret_sauce");

  /* and I am on the Inventory Page */
});

//Feature: Checking Cart
test("Checking Cart Senario 1: Check for 1 item added", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  /* and I navigate to my cart */
  await inventoryPage.clickCart();

  /* THEN I should see "Sauce Labs Backpack" */
  const cartPage = new CartPage(page);
  await cartPage.checkItemInCart("Sauce Labs Backpack");
});

test("Checking Cart Senario 2: Check for multiple items added", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  await inventoryPage.addItemToCart("Sauce Labs Bike Light");
  /* and I navigate to my cart */
  await inventoryPage.clickCart();

  /* THEN I should see "Sauce Labs Backpack" and "Sauce Labs Bike Light" */
  const cartPage = new CartPage(page);
  await cartPage.checkItemInCart("Sauce Labs Backpack");
  await cartPage.checkItemInCart("Sauce Labs Bike Light");
});

test("Checking Car Senario 3: Check for empty Cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I navigate to my cart */
  await inventoryPage.clickCart();

  /* THEN I should see no Items */
  const cartPage = new CartPage(page);
  await cartPage.checkEmptyCart();
});

//Feature: Navigation
test("Navigation Senario 1: Return to inventory page", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* GIVEN I am on the Cart Page */
  await inventoryPage.clickCart();

  /* WHEN I Click on the "Continue Shopping" Button */
  const cartPage = new CartPage(page);
  await cartPage.clickContinueShopping();

  /* THEN I should see "Products" */
  await inventoryPage.checkTitle("Products");
});

test("Navigation Senario 2: Go to Checkout", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* GIVEN I am on the Cart Page */
  await inventoryPage.clickCart();

  /* WHEN I Click on the "Checkout" Button */
  const cartPage = new CartPage(page);
  await cartPage.clickCheckout();

  /* THEN I should see "Checkout: Your Information" */
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.checkTitle("Checkout: Your Information");
});

//Feature: Removing an Item
test("Remove Senario 1: Remove 1 item from Cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  /* and I navigate to my cart */
  await inventoryPage.clickCart();
  /* and I remove "Sauce Labs Backpack" */
  const cartPage = new CartPage(page);
  await cartPage.removeItem("remove-sauce-labs-backpack");

  /* THEN I should not see "Sauce Labs Backpack" */
  await cartPage.checkItemNotInCart("Sauce Labs Backpack");
});

test("Remove Senario 1: Remove multiple items from Cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  await inventoryPage.addItemToCart("Sauce Labs Bike Light");
  /* and I navigate to my cart */
  await inventoryPage.clickCart();
  /* and I remove "Sauce Labs Backpack" and "Sauce Labs Bike Light" */
  const cartPage = new CartPage(page);
  await cartPage.removeItem("remove-sauce-labs-backpack");
  await cartPage.removeItem("remove-sauce-labs-bike-light");

  /* THEN I should not see "Sauce Labs Backpack" and "Sauce Labs Bike Light" */
  await cartPage.checkItemNotInCart("Sauce Labs Backpack");
  await cartPage.checkItemNotInCart("Sauce Labs Bike Light");
});
