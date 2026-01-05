const { expect } = require("@playwright/test");

class inventoryPage {
  constructor(page) {
    this.page = page;
  }
}

module.exports = InventoryPage;
