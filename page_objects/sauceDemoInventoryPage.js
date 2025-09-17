class SauceDemoInventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = '.title';
    this.inventoryContainer = '.inventory_container';
  }

  async waitForPageLoad() {
    await this.page.waitForSelector(this.inventoryContainer);
  }

  async getPageTitle() {
    return await this.page.textContent(this.pageTitle);
  }
}

module.exports = SauceDemoInventoryPage;