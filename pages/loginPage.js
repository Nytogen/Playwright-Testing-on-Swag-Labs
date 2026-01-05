const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = this.page.locator("input#user-name");
    this.password = this.page.locator("#password");
    this.login = this.page.locator("#login-button");
  }

  async inputUsername(username) {
    await this.username.fill(username);
  }

  async inputPassword(password) {
    await this.password.fill(password);
  }

  async clickLogin() {
    await this.login.click();
  }
}

module.exports = LoginPage;
