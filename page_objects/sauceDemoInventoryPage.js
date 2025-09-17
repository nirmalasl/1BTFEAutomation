/**
 * Sauce Demo Inventory Page Object
 * Handles interactions with the product inventory page
 */

const BasePage = require('./basePage');

class SauceDemoInventoryPage extends BasePage {
  /**
   * Constructor - Initialize page selectors and constants
   * @param {Page} page - Playwright page instance
   */
  constructor(page) {
    super(page);
    
    // Page element selectors
    this.selectors = {
      pageTitle: '.title',
      inventoryContainer: '.inventory_container',
      inventoryItem: '.inventory_item',
      inventoryItemName: '.inventory_item_name',
      addToCartButton: '[data-test^="add-to-cart-"]',
      removeButton: '[data-test^="remove-"]',
      cartIcon: '.shopping_cart_link',
      cartBadge: '.shopping_cart_badge'
    };
    
    // Constants
    this.BUTTON_STATE_CHANGE_DELAY = 500; // ms
  }

  /**
   * Wait for the inventory page to fully load
   */
  async waitForPageLoad() {
    await this.waitForElement(this.selectors.inventoryContainer);
  }

  /**
   * Get the page title
   * @returns {Promise<string>} Page title text
   */
  async getPageTitle() {
    return await this.getText(this.selectors.pageTitle);
  }

  /**
   * Add a specific product to the cart
   * @param {string} productName - Name of the product to add
   * @returns {Promise<boolean>} True if successfully added
   * @throws {Error} If product not found or already in cart
   */
  async addProductToCart(productName) {
    const inventoryItems = await this.page.locator(this.selectors.inventoryItem).all();
    
    for (const item of inventoryItems) {
      const name = await item.locator(this.selectors.inventoryItemName).textContent();
      
      if (name?.trim() === productName) {
        const addButton = item.locator(this.selectors.addToCartButton);
        
        if (await addButton.isVisible()) {
          await addButton.click();
          await this.page.waitForTimeout(this.BUTTON_STATE_CHANGE_DELAY);
          return true;
        }
      }
    }
    
    throw new Error(`Product "${productName}" not found or already in cart`);
  }

  /**
   * Remove a specific product from the cart
   * @param {string} productName - Name of the product to remove
   * @returns {Promise<boolean>} True if successfully removed
   * @throws {Error} If product not found or not removable
   */
  async removeProductFromCart(productName) {
    const inventoryItems = await this.page.locator(this.selectors.inventoryItem).all();
    
    for (const item of inventoryItems) {
      const name = await item.locator(this.selectors.inventoryItemName).textContent();
      
      if (name?.trim() === productName) {
        const removeButton = item.locator(this.selectors.removeButton);
        
        if (await removeButton.isVisible()) {
          await removeButton.click();
          await this.page.waitForTimeout(this.BUTTON_STATE_CHANGE_DELAY);
          return true;
        }
      }
    }
    
    throw new Error(`Product "${productName}" not found in cart or not removable`);
  }

  /**
   * Check if a product is currently in the cart
   * @param {string} productName - Name of the product to check
   * @returns {Promise<boolean>} True if product is in cart
   */
  async isProductInCart(productName) {
    const inventoryItems = await this.page.locator(this.selectors.inventoryItem).all();
    
    for (const item of inventoryItems) {
      const name = await item.locator(this.selectors.inventoryItemName).textContent();
      
      if (name?.trim() === productName) {
        const removeButton = item.locator(this.selectors.removeButton);
        return await removeButton.isVisible();
      }
    }
    
    return false;
  }

  /**
   * Get the cart badge count
   * @returns {Promise<string|null>} Cart count or null if not visible
   */
  async getCartBadgeCount() {
    try {
      const badge = await this.page.locator(this.selectors.cartBadge);
      
      if (await badge.isVisible()) {
        return await badge.textContent();
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if cart badge is visible
   * @returns {Promise<boolean>} True if badge is visible
   */
  async isCartBadgeVisible() {
    try {
      return await this.page.locator(this.selectors.cartBadge).isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Click on the cart icon to navigate to cart page
   */
  async clickCartIcon() {
    await this.click(this.selectors.cartIcon);
  }

  /**
   * Get all available product names
   * @returns {Promise<string[]>} Array of product names
   */
  async getAllProducts() {
    const products = [];
    const inventoryItems = await this.page.locator(this.selectors.inventoryItem).all();
    
    for (const item of inventoryItems) {
      const name = await item.locator(this.selectors.inventoryItemName).textContent();
      if (name?.trim()) {
        products.push(name.trim());
      }
    }
    
    return products;
  }
}

module.exports = SauceDemoInventoryPage;