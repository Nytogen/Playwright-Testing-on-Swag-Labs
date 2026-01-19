const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartList = this.page.locator("div[data-test='cart-list']");
    this.continueShopping = this.page.locator("button#continue-shopping");
    this.checkout = this.page.locator("button#checkout");

    this.inventoryList = this.cartList.locator(
      "div[data-test='inventory-item']",
    );
  }

  async clickContinueShopping() {
    await this.continueShopping.click();
  }

  async clickCheckout() {
    await this.checkout.click();
  }

  async removeItem(itemName) {
    await this.cartList.locator(`button[data-test='${itemName}']`).click();
  }

  //Validation
  async checkItemInCart(itemName) {
    await expect(this.cartList.getByText(itemName)).toBeVisible();
  }

  async checkItemNotInCart(itemName) {
    await expect(this.cartList.getByText(itemName)).not.toBeVisible();
  }

  async checkEmptyCart() {
    await expect(this.inventoryList).not.toBeVisible();
  }
}

module.exports = CartPage;
