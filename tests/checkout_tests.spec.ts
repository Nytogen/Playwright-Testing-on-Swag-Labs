import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import CheckoutPage from "../pages/checkoutPage";
import InventoryPage from "../pages/inventoryPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  /* GIVEN I am logged in as standard_user */

  await loginPage.loginFull("standard_user", "secret_sauce");

  /* and I am on the checkout Page */
  await page.goto("https://www.saucedemo.com/checkout-step-one.html");
});

//Feature: Shipping information
test("Shipping Information Senario 1: Valid information is entered", async ({
  page,
}) => {
  const checkoutPage = new CheckoutPage(page);

  /* WHEN I enter "Foo" in the "First Name" Field */
  await checkoutPage.enterFirstName("Foo");
  /* and I enter "Bar" in the "Last Name" Field */
  await checkoutPage.enterLastName("Bar");
  /* and I enter "Foobar" in the "Zip/Postal Code" Field */
  await checkoutPage.enterPostalCode("Foobar");
  /* and I click "Continue" */
  await checkoutPage.clickContinue();

  /* THEN I should see "Checkout: Overview" */
  await checkoutPage.checkTitle("Checkout: Overview");
});

test("Shipping Information Senario 2: First name is not entered", async ({
  page,
}) => {
  const checkoutPage = new CheckoutPage(page);

  /* WHEN and I enter "Bar" in the "Last Name" Field */
  await checkoutPage.enterLastName("Bar");
  /* and I enter "Foobar" in the "Zip/Postal Code" Field */
  await checkoutPage.enterPostalCode("Foobar");
  /* and I click "Continue" */
  await checkoutPage.clickContinue();

  /* THEN I should see "Error: First Name is required" */
  await checkoutPage.checkError("Error: First Name is required");
  /* and I should see "Checkout: Your information" */
  await checkoutPage.checkTitle("Checkout: Your Information");
});

test("Shipping Information Senario 3: Last name is not entered", async ({
  page,
}) => {
  const checkoutPage = new CheckoutPage(page);

  /* WHEN I enter "Foo" in the "First Name" Field */
  await checkoutPage.enterFirstName("Foo");
  /* and I enter "Foobar" in the "Zip/Postal Code" Field */
  await checkoutPage.enterPostalCode("Foobar");
  /* and I click "Continue" */
  await checkoutPage.clickContinue();

  /* THEN I should see "Error: Last Name is required" */
  await checkoutPage.checkError("Error: Last Name is required");
  /* and I should see "Checkout: Your information" */
  await checkoutPage.checkTitle("Checkout: Your Information");
});

test("Shipping Information Senario 4: Postal Code is not entered", async ({
  page,
}) => {
  const checkoutPage = new CheckoutPage(page);

  /* WHEN I enter "Foo" in the "First Name" Field */
  await checkoutPage.enterFirstName("Foo");
  /* and I enter "Bar" in the "Last Name" Field */
  await checkoutPage.enterLastName("Bar");
  /* and I click "Continue" */
  await checkoutPage.clickContinue();

  /* THEN I should see "Error: Postal Code is required" */
  await checkoutPage.checkError("Error: Postal Code is required");
  /* and I should see "Checkout: Your information" */
  await checkoutPage.checkTitle("Checkout: Your Information");
});

//Feature: Price and Item Verifcation

test("Price Senario 1: Checking out one item", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  /* GIVEN I am on the Inventory Page */
  await page.goto("https://www.saucedemo.com/inventory.html");

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  /* and I go to the checkout page */
  await checkoutPage.goToCheckout();
  /* and I enter valid credentials */
  await checkoutPage.enterValidCredentials();
  /* and I click "continue" */
  await checkoutPage.clickContinue();

  /* THEN I should see "Item total: $29.99" */
  await checkoutPage.checkTotalPrice("Item total: $29.99");
  /* and I should see "Sauce Labs Backpack" */
  await checkoutPage.checkItemAppears("Sauce Labs Backpack");
});

test("Price Senario 2: Checking out one multiple items", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  /* GIVEN I am on the Inventory Page */
  await page.goto("https://www.saucedemo.com/inventory.html");

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  await inventoryPage.addItemToCart("Sauce Labs Bike Light");
  /* and I go to the checkout page */
  await checkoutPage.goToCheckout();
  /* and I enter valid credentials */
  await checkoutPage.enterValidCredentials();
  /* and I click "continue" */
  await checkoutPage.clickContinue();

  /* THEN I should see "Item total: $39.98" */
  await checkoutPage.checkTotalPrice("Item total: $39.98");
  /* and I should see "Sauce Labs Backpack" */
  await checkoutPage.checkItemAppears("Sauce Labs Backpack");
  await checkoutPage.checkItemAppears("Sauce Labs Bike Light");
});

test("Price Senario 3: Checking out after removing some items", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  /* GIVEN I am on the Inventory Page */
  await page.goto("https://www.saucedemo.com/inventory.html");

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  await inventoryPage.addItemToCart("Sauce Labs Bike Light");
  /* and I click "Remove" on "Sauce Labs Backpack" */
  await inventoryPage.removeItemToCart("Sauce Labs Backpack");
  /* and I go to the checkout page */
  await checkoutPage.goToCheckout();
  /* and I enter valid credentials */
  await checkoutPage.enterValidCredentials();
  /* and I click "continue" */
  await checkoutPage.clickContinue();

  /* THEN I should see "Item total: $9.99" */
  await checkoutPage.checkTotalPrice("Item total: $9.99");
  /* and I should see "Sauce Labs Bike Light" */
  await checkoutPage.checkItemAppears("Sauce Labs Bike Light");
  /* and I should not see "Sauce Labs Backpack" */
  await checkoutPage.checkItemDoesNotAppear("Sauce Labs Backpack");
});

test("Price Senario 4: Checking out after removing all items", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  /* GIVEN I am on the Inventory Page */
  await page.goto("https://www.saucedemo.com/inventory.html");

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  await inventoryPage.addItemToCart("Sauce Labs Bike Light");
  /* and I click "Remove" on "Sauce Labs Backpack" and "Sauce Labs Bike Light" */
  await inventoryPage.removeItemToCart("Sauce Labs Backpack");
  await inventoryPage.removeItemToCart("Sauce Labs Bike Light");
  /* and I go to the checkout page */
  await checkoutPage.goToCheckout();
  /* and I enter valid credentials */
  await checkoutPage.enterValidCredentials();
  /* and I click "continue" */
  await checkoutPage.clickContinue();

  /* THEN I should see "Item total: $0" */
  await checkoutPage.checkTotalPrice("Item total: $0");
  /* and I should not see "Sauce Labs Backpack" */
  await checkoutPage.checkItemDoesNotAppear("Sauce Labs Backpack");
  /* and I should not see "Sauce Labs Bike Light" */
  await checkoutPage.checkItemDoesNotAppear("Sauce Labs Bike Light");
});

//Feature: Complete Checkout
test("Complete Checkout Senario 1: Complete Checkout", async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  /* WHEN enter valid credentials" */
  await checkoutPage.enterValidCredentials();
  /* and I click "continue" */
  await checkoutPage.clickContinue();
  /* and I click "Finish" */
  await checkoutPage.clickFinish();

  /* THEN I should see "Checkout: Complete!" */
  await checkoutPage.checkTitle("Checkout: Complete!");
});

test("Complete Checkout Senario 2: Go back to home", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  /* WHEN enter valid credentials" */
  await checkoutPage.enterValidCredentials();
  /* and I click "continue" */
  await checkoutPage.clickContinue();
  /* and I click "Finish" */
  await checkoutPage.clickFinish();
  /* and I click "Back Home" */
  await checkoutPage.clickBackHome();

  /* THEN I should see "Products" */
  await inventoryPage.checkTitle("Products");
  /* and I should see an empty cart */
  await inventoryPage.checkNoCartItems();
});
