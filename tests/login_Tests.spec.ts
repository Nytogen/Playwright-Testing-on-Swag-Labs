import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import InventoryPage from "../pages/inventoryPage";

test.beforeEach(async ({ page }) => {
  /* GIVEN I am a user at the login page */
  await page.goto("https://www.saucedemo.com/");
});

//Feature: Logging In
test("Login Senario 1: Sucessful login with a valid user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  /* WHEN I type "standard_user" in "Username" */
  await loginPage.inputUsername("standard_user");
  /* And I type "secret_sauce" in "Password" */
  await loginPage.inputPassword("secret_sauce");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I shouldn't see the login button */
  await loginPage.checkLoginButtonDoesNotExist();
  /* And I should see "Products" */
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.checkTitle("Products");
});

test("Login Senario 2: Sucessful login with a valid user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  /* WHEN I type "standard_user" in "Username" */
  await loginPage.inputUsername("standard_user");
  /* And I type "Wrong_password" in "Password" */
  await loginPage.inputPassword("Wrong_password");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see the login button */
  await loginPage.checkLoginButtonExists();
  /* And I should see "Epic sadface: Username and password do not match any user in this service" */
  await loginPage.CheckErrorMessage(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Login Senario 3: Unsucessful login due to invalid username", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  /* WHEN I type "wrong_user" in "Username" */
  await loginPage.inputUsername("wrong_user");
  /* And I type "secret_sauce" in "Password" */
  await loginPage.inputPassword("secret_sauce");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see the login button */
  await loginPage.checkLoginButtonExists();
  /* And I should see "Epic sadface: Username and password do not match any user in this service" */
  await loginPage.CheckErrorMessage(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Login Senario 4: Unsucessful login due to user being lockedout", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  /* WHEN I type "locked_out_user" in "Username" */
  await loginPage.inputUsername("locked_out_user");
  /* And I type "secret_sauce" in "Password" */
  await loginPage.inputPassword("secret_sauce");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see the login button */
  await loginPage.checkLoginButtonExists();
  /* And I should see "Epic sadface: Username and password do not match any user in this service" */
  await loginPage.CheckErrorMessage(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});

test("Login Senario 5: Unsucessful login due to empty username and password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  /* WHEN I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see the login button */
  await loginPage.checkLoginButtonExists();
  /* And I should see "Epic sadface: Username is required */
  await loginPage.CheckErrorMessage("Epic sadface: Username is required");
});

test("Login Senario 6: Unsucessful login due to no password was inputted", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  /* WHEN I type "standard_user" in "Username" */
  loginPage.inputUsername("standard_user");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see the login button */
  await loginPage.checkLoginButtonExists();
  /* And I should see "Epic sadface: Username is required */
  await loginPage.CheckErrorMessage("Epic sadface: Password is required");
});
