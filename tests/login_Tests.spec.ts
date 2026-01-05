import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";

//Feature: Logging In
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

test("Senario 2: Sucessful login with a valid user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const loginPage = new LoginPage(page);

  /* WHEN I type "standard_user" in "Username" */
  await loginPage.inputUsername("standard_user");
  /* And I type "Wrong_password" in "Password" */
  await loginPage.inputPassword("Wrong_password");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see "Login" */
  await expect(page.getByText("Login")).not.toHaveCount(0);
  /* And I should see "Epic sadface: Username and password do not match any user in this service" */
  await expect(page.locator("h3[data-test='error']")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Senario 3: Unsucessful login due to invalid username", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");

  const loginPage = new LoginPage(page);

  /* WHEN I type "wrong_user" in "Username" */
  await loginPage.inputUsername("wrong_user");
  /* And I type "secret_sauce" in "Password" */
  await loginPage.inputPassword("secret_sauce");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see "Login" */
  await expect(page.getByText("Login")).not.toHaveCount(0);
  /* And I should see "Epic sadface: Username and password do not match any user in this service" */
  await expect(page.locator("h3[data-test='error']")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("Senario 4: Unsucessful login due to user being lockedout", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");

  const loginPage = new LoginPage(page);

  /* WHEN I type "locked_out_user" in "Username" */
  await loginPage.inputUsername("locked_out_user");
  /* And I type "secret_sauce" in "Password" */
  await loginPage.inputPassword("secret_sauce");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see "Login" */
  await expect(page.getByText("Login")).not.toHaveCount(0);
  /* And I should see "Epic sadface: Username and password do not match any user in this service" */
  await expect(page.locator("h3[data-test='error']")).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("Senario 5: Unsucessful login due to empty username and password", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");

  const loginPage = new LoginPage(page);

  /* WHEN I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see "Login" */
  await expect(page.getByText("Login")).not.toHaveCount(0);
  /* And I should see "Epic sadface: Username is required */
  await expect(page.locator("h3[data-test='error']")).toHaveText(
    "Epic sadface: Username is required"
  );
});

test("Senario 6: Unsucessful login due to no password was inputted", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");

  const loginPage = new LoginPage(page);

  /* WHEN I type "standard_user" in "Username" */
  loginPage.inputUsername("standard_user");
  /* And I click "Login" */
  await loginPage.clickLogin();

  /* THEN I should see "Login" */
  await expect(page.getByText("Login")).not.toHaveCount(0);
  /* And I should see "Epic sadface: Username is required */
  await expect(page.locator("h3[data-test='error']")).toHaveText(
    "Epic sadface: Password is required"
  );
});
