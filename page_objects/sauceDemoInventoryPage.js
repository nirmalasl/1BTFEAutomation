const BasePage = require('./basePage');

class SauceDemoInventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = '.title';
    this.inventoryContainer = '.inventory_container';
    this.inventoryItem = '.inventory_item';
    this.inventoryItemName = '.inventory_item_name';
    this.addToCartButton = '[data-test^="add-to-cart-"]';
    this.removeButton = '[data-test^="remove-"]';
    this.cartIcon = '.shopping_cart_link';
    this.cartBadge = '.shopping_cart_badge';
  }

  async waitForPageLoad() {
    await this.page.waitForSelector(this.inventoryContainer);
  }

  async getPageTitle() {
    return await this.page.textContent(this.pageTitle);
  }

  async addProductToCart(productName) {
    const inventoryItems = await this.page.locator(this.inventoryItem).all();
    
    for (const item of inventoryItems) {
      const name = await item.locator(this.inventoryItemName).textContent();
      if (name?.trim() === productName) {
        const addButton = item.locator(this.addToCartButton);
        if (await addButton.isVisible()) {
          await addButton.click();
          // Wait a moment for the button state to change
          await this.page.waitForTimeout(500);
          return true;
        }
      }
    }
    throw new Error(`Product "${productName}" not found or already in cart`);
  }

  async removeProductFromCart(productName) {
    const inventoryItems = await this.page.locator(this.inventoryItem).all();
    
    for (const item of inventoryItems) {
      const name = await item.locator(this.inventoryItemName).textContent();
      if (name?.trim() === productName) {
        const removeButton = item.locator(this.removeButton);
        if (await removeButton.isVisible()) {
          await removeButton.click();
          // Wait a moment for the button state to change
          await this.page.waitForTimeout(500);
          return true;
        }
      }
    }
    throw new Error(`Product "${productName}" not found in cart or not removable`);
  }

  async isProductInCart(productName) {
    const inventoryItems = await this.page.locator(this.inventoryItem).all();
    
    for (const item of inventoryItems) {
      const name = await item.locator(this.inventoryItemName).textContent();
      if (name?.trim() === productName) {
        const removeButton = item.locator(this.removeButton);
        return await removeButton.isVisible();
      }
    }
    return false;
  }

  async getCartBadgeCount() {
    try {
      const badge = await this.page.locator(this.cartBadge);
      if (await badge.isVisible()) {
        return await badge.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async isCartBadgeVisible() {
    try {
      return await this.page.locator(this.cartBadge).isVisible();
    } catch (error) {
      return false;
    }
  }

  async clickCartIcon() {
    await this.page.click(this.cartIcon);
  }

  async getAllProducts() {
    const products = [];
    const inventoryItems = await this.page.locator(this.inventoryItem).all();
    
    for (const item of inventoryItems) {
      const name = await item.locator(this.inventoryItemName).textContent();
      products.push(name?.trim());
    }
    
    return products;
  }
}

module.exports = SauceDemoInventoryPage;