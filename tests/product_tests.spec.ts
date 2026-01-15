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

//Feature: Adding and Removing Items
test("Items Senario 1: User adds one item", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");

  /* THEN I should not see the cart have a red circle badge with the number 1 */
  await inventoryPage.checkCartNumber(1);
  /* and I should  see "remove" on "Sauce Labs Backpack" */
  await inventoryPage.checkItemButtonisVisible("remove-sauce-labs-backpack");
  /* and I should not see "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.checkItemButtonisNotVisible(
    "add-to-cart-sauce-labs-backpack"
  );
});

test("Items Senario 2: User adds multiple items", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  /* and I click "Add to cart" on "Sauce Labs Bike Light" */
  await inventoryPage.addItemToCart("Sauce Labs Bike Light");

  /* THEN I should not see the cart have a red circle badge with the number 2 */
  await inventoryPage.checkCartNumber(2);
  /* and I should  see "remove" on "Sauce Labs Backpack" */
  await inventoryPage.checkItemButtonisVisible("remove-sauce-labs-backpack");
  /* and I should not see "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.checkItemButtonisNotVisible(
    "add-to-cart-sauce-labs-backpack"
  );
  /* and I should not see "Add to cart" on "Sauce Labs Bike Light" */
  await inventoryPage.checkItemButtonisVisible("remove-sauce-labs-bike-light");
  /* and I should see "remove" on "Sauce Labs Bike Light" */
  await inventoryPage.checkItemButtonisNotVisible("Sauce Labs Bike Light");
});

test("Items Senario 3: User removes an item", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  /* and I click "Add to cart" on "Sauce Labs Bike Light" */
  await inventoryPage.removeItemToCart("Sauce Labs Backpack");

  /* THEN I should not see the cart have a red circle badge */
  await inventoryPage.checkNoCartItems();
  /* and I should "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.checkItemButtonisVisible(
    "add-to-cart-sauce-labs-backpack"
  );
  /* and I should not see "remove" on "Sauce Labs Backpack" */
  await inventoryPage.checkItemButtonisNotVisible("remove-sauce-labs-backpack");
});

test("Items Senario 4: User logs out and logs back in with a saved cart", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  /* and I logout */
  await inventoryPage.openBurgerIcon();
  await inventoryPage.clickLogout();
  /* and I log back in as "standard_user" */
  const loginPage = new LoginPage(page);
  await loginPage.loginFull("standard_user", "secret_sauce");

  /* THEN I should not see the cart have a red circle badge with the number 1 */
  await inventoryPage.checkCartNumber(1);
  /* and I should not see "Add to cart" on "Sauce Labs Backpack" */
  await inventoryPage.checkItemButtonisNotVisible(
    "add-to-cart-sauce-labs-backpack"
  );
  /* and I should  see "remove" on "Sauce Labs Backpack" */
  await inventoryPage.checkItemButtonisVisible("remove-sauce-labs-backpack");
});

//Feature: Sorting/filter Items
test("Senario 1: User sorts items in ascending alphabetical order", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I filter by "Name (A to Z)" */
  await inventoryPage.selectFilter("az");

  /* THEN I should see item "Sauce Labs Backpack" as the first item */
  await inventoryPage.checkFirstItem("Sauce Labs Backpack");
  /* and I should see item "Test.allTheThings() T-Shirt (Red)" as the last item */
  await inventoryPage.checkLastItem("Test.allTheThings() T-Shirt (Red)");
});

test("Senario 2: User sorts items in descending alphabetical order", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I filter by "Name (Z to A)" */
  await inventoryPage.selectFilter("za");

  /* THEN I should see item "Test.allTheThings() T-Shirt (Red)" as the first item */
  await inventoryPage.checkFirstItem("Test.allTheThings() T-Shirt (Red)");
  /* and I should see item "Sauce Labs Backpack" as the last item */
  await inventoryPage.checkLastItem("Sauce Labs Backpack");
});

test("Senario 3: User sorts items is ascending price order", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I filter by "Price (low to high)" */
  await inventoryPage.selectFilter("lohi");

  /* THEN I should see item "Sauce Labs Onesie" as the first item */
  await inventoryPage.checkFirstItem("Sauce Labs Onesie");
  /* and I should see item "Sauce Labs Fleece Jacket" as the last item */
  await inventoryPage.checkLastItem("Sauce Labs Fleece Jacket");
});

test("Senario 4: User sorts items is descending price order", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I filter by "Price (high to low)" */
  await inventoryPage.selectFilter("hilo");

  /* THEN I should see item "Sauce Labs Fleece Jacket" as the first item */
  await inventoryPage.checkFirstItem("Sauce Labs Fleece Jacket");
  /* and I should see item "Sauce Labs Onesie" as the last item */
  await inventoryPage.checkLastItem("Sauce Labs Onesie");
});

//Feature: Logout
test("Logout Senario 1: user decides to logout", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click the burger menu on the top left */
  await inventoryPage.openBurgerIcon();
  /* and I click on "Logout" */
  await inventoryPage.clickLogout();

  /* THEN I should see "Login" */
  const loginPage = new LoginPage(page);
  await loginPage.checkLoginButtonExists();
  /* and I shouldn't see "Products" */
  await inventoryPage.checkNoTitle();
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
  await inventoryPage.checkTitle("Your Cart");
  /* and I should not see "Products" */
  await inventoryPage.checkNotTitle("Products");
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
  await inventoryPage.checkTitle("Products");
  /* and I should not see "Your Cart" */
  await inventoryPage.checkNotTitle("Your Cart");
});

test("Nav Senario 4: User Clicks on an item", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  /* WHEN I click on "Sauce Labs Backpack" */
  await inventoryPage.clickOnItem("Sauce Labs Backpack");

  /* THEN I should see "Back to products" */
  await inventoryPage.checkBackToProductButtonExists();
  /* and I should not see "Sauce Labs Bike Light" */
  await inventoryPage.checkProductNotVisible("Sauce Labs Bike Light");
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
  await inventoryPage.checkNoCartItems();

  //App does not revert the buttons but checks are added for completeness
  /* and I should see "Add to cart" on "Sauce Labs Backpack" */
  /*
  await inventoryPage.checkItemButtonisVisible('add-to-cart-sauce-labs-backpack');
  /* and I should not see "remove" on "Sauce Labs Backpack" */
  /*
  await inventoryPage.checkItemButtonisNotVisible('remove-sauce-labs-backpack');
  */
});
