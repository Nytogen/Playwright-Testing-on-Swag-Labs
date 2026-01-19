const { expect } = require("@playwright/test");

class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.title = this.page.locator("span[data-test='title]");

    this.firstName = this.page.locator("input[data-test='firstName']");
    this.lastName = this.page.locator("input[data-test='lastName']");
    this.postalCode = this.page.locator("input[data-test='postalCode']");

    this.continue = this.page.locator("input#continue");

    this.title = this.page.locator("[data-test='title']");
    this.error = this.page.locator("[data-test='error']");

    this.cartList = this.page.locator("div[data-test='cart-list']");
    this.itemTotal = this.page.locator("[data-test='subtotal-label']");
  }

  async enterFirstName(firstName) {
    await this.firstName.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastName.fill(lastName);
  }

  async enterPostalCode(postalCode) {
    await this.postalCode.fill(postalCode);
  }

  async clickContinue() {
    await this.continue.click();
  }

  async goToCheckout() {
    await this.page.goto("https://www.saucedemo.com/checkout-step-one.html");
  }

  async enterValidCredentials() {
    await this.enterFirstName("Foo");
    await this.enterLastName("Bar");
    await this.enterPostalCode("Foobar");
  }

  /* Assertions */
  async checkTitle(title) {
    await expect(this.title).toHaveText(title);
  }

  async checkError(error) {
    await expect(this.error).toHaveText(error);
  }

  async checkTotalPrice(price) {
    await expect(this.itemTotal.getByText(price)).toBeVisible();
  }

  async checkItemAppears(itemName) {
    await expect(this.cartList.getByText(itemName)).toBeVisible();
  }
}

module.exports = CheckoutPage;
