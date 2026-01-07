const { expect } = require("@playwright/test");

class InventoryPage {
  constructor(page) {
    this.page = page;

    //Nav
    this.burgerIcon = this.page.locator("button#react-burger-menu-btn");
    this.logout = this.page.locator("a#logout_sidebar_link");
    this.about = this.page.locator("a#about_sidebar_link");
    this.cart = this.page.locator("a[data-test='shopping-cart-link']");
  }

  async openBurgerIcon() {
    await this.burgerIcon.click();
  }

  async clickLogout() {
    await this.logout.click();
  }

  async clickAbout() {
    await this.about.click();
  }

  async clickCart() {
    await this.cart.click();
  }
}

module.exports = InventoryPage;
