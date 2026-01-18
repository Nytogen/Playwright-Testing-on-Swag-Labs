const { expect } = require("@playwright/test");

class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.title = this.page.locator("span[data-test='title]");
  }

  /* Assertions */
  async checkTitle() {}
}

module.exports = CheckoutPage;
