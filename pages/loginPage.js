const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = this.page.locator("input#user-name");
    this.password = this.page.locator("#password");
    this.login = this.page.locator("#login-button");
  }

  /* Seperate functions were created so that it is easier to add BDD comments into the tests. */
  async inputUsername(username) {
    await this.username.fill(username);
  }

  async inputPassword(password) {
    await this.password.fill(password);
  }

  async clickLogin() {
    await this.login.click();
  }

  /* Assertions */
  async checkLoginButtonExists() {
    await expect(this.page.locator("[data-test='login-button']")).toBeVisible();
  }

  async checkLoginButtonDoesNotExist() {
    await expect(
      this.page.locator("[data-test='login-button']")
    ).not.toBeVisible();
  }

  async CheckErrorMessage(erorMessage) {
    await expect(this.page.locator("h3[data-test='error']")).toHaveText(
      erorMessage
    );
  }

  /* For cases where the login page is not tested a combined function is created */
  async loginFull(username, password) {
    await this.inputUsername(username);
    await this.inputPassword(password);
    await this.clickLogin();
  }
}

module.exports = LoginPage;
