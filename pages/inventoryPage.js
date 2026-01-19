const { expect } = require("@playwright/test");

class InventoryPage {
  constructor(page) {
    this.page = page;

    //Nav
    this.burgerIcon = this.page.locator("button#react-burger-menu-btn");
    this.allItems = this.page.locator("a#inventory_sidebar_link");
    this.about = this.page.locator("a#about_sidebar_link");
    this.logout = this.page.locator("a#logout_sidebar_link");
    this.reset = this.page.locator("a#reset_sidebar_link");

    this.cart = this.page.locator("a[data-test='shopping-cart-link']");
    this.cartBadge = this.page.locator("[data-test='shopping-cart-badge']");
    this.backProducts = this.page.locator("button[name='back-to-products']");

    this.filter = this.page.locator(
      "select[data-test='product-sort-container']",
    );

    this.title = this.page.locator("[data-test='title']");

    this.inventoryDescrptions = this.page.locator(
      "[data-test='inventory-item-description']",
    );

    this.firstItem = this.page
      .locator("[data-test='inventory-list'] > :first-child")
      .locator("[data-test='inventory-item-name']");

    this.lastItem = this.page
      .locator("[data-test='inventory-list'] > :last-child")
      .locator("[data-test='inventory-item-name']");
  }

  /* Nav */

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

  async clickAllItems() {
    await this.allItems.click();
  }

  async clickResetAppState() {
    await this.reset.click();
  }

  async clickOnItem(productName) {
    await this.page.getByText(productName).click();
  }

  /* Items */
  async addItemToCart(productName) {
    const child = this.page.getByText(productName);
    const parent = this.inventoryDescrptions.filter({ has: child });
    await parent.locator("button").click();
  }

  async removeItemToCart(productName) {
    const child = this.page.getByText(productName);
    const parent = this.inventoryDescrptions.filter({ has: child });
    await parent.locator("button").click();
  }

  async selectFilter(filterValue) {
    await this.filter.selectOption({ value: filterValue });
  }

  /* Assertions */

  async checkFirstItem(itemName) {
    await expect(this.firstItem).toHaveText(itemName);
  }

  async checkLastItem(itemName) {
    await expect(this.lastItem).toHaveText(itemName);
  }

  async checkTitle(title) {
    await expect(this.title).toHaveText(title);
  }

  async checkNotTitle(title) {
    await expect(this.title).not.toHaveText(title);
  }

  async checkNoTitle() {
    await expect(this.title).not.toBeVisible();
  }

  async checkItemButtonisVisible(itemName) {
    await expect(this.page.locator(`[data-test='${itemName}']`)).toBeVisible();
  }

  async checkItemButtonisNotVisible(itemName) {
    await expect(
      this.page.locator(`[data-test='${itemName}']`),
    ).not.toBeVisible();
  }

  async checkCartNumber(number) {
    await expect(this.cartBadge).toHaveText(`${number}`);
  }

  async checkNoCartItems() {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async checkBackToProductButtonExists() {
    await expect(this.backProducts).toBeVisible();
  }
  async checkProductNotVisible(productName) {
    await expect(this.page.getByText(productName)).not.toBeVisible();
  }
}

module.exports = InventoryPage;
