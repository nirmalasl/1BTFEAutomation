/**
 * Sauce Demo Checkout Overview Page Object
 * Handles interactions with the checkout overview/summary page
 */

const BasePage = require('./basePage');

class SauceDemoCheckoutOverviewPage extends BasePage {
  /**
   * Constructor - Initialize page selectors and constants
   * @param {Page} page - Playwright page instance
   */
  constructor(page) {
    super(page);
    
    // Page element selectors
    this.selectors = {
      finishButton: '#finish',
      cancelButton: '#cancel',
      pageTitle: '.title',
      cartItem: '.cart_item',
      cartItemName: '.inventory_item_name',
      cartItemPrice: '.inventory_item_price',
      cartQuantity: '.cart_quantity',
      summaryInfo: '.summary_info',
      summarySubtotal: '.summary_subtotal_label',
      summaryTax: '.summary_tax_label',
      summaryTotal: '.summary_total_label',
      checkoutSummaryContainer: '.checkout_summary_container'
    };
  }

  /**
   * Click the finish button to complete the order
   */
  async clickFinish() {
    await this.click(this.selectors.finishButton);
  }

  /**
   * Click the cancel button
   */
  async clickCancel() {
    await this.click(this.selectors.cancelButton);
  }

  /**
   * Get the page title
   * @returns {Promise<string>} Page title text
   */
  async getPageTitle() {
    return await this.getText(this.selectors.pageTitle);
  }

  /**
   * Get all order items with details
   * @returns {Promise<Array>} Array of order items with name, price, and quantity
   */
  async getOrderItems() {
    const items = [];
    const cartItems = await this.page.locator(this.selectors.cartItem).all();
    
    for (const item of cartItems) {
      const name = await item.locator(this.selectors.cartItemName).textContent();
      const price = await item.locator(this.selectors.cartItemPrice).textContent();
      const quantity = await item.locator(this.selectors.cartQuantity).textContent();
      
      items.push({
        name: name?.trim(),
        price: price?.trim(),
        quantity: quantity?.trim()
      });
    }
    
    return items;
  }

  /**
   * Check if a specific product is in the order
   * @param {string} productName - Name of the product to check
   * @returns {Promise<boolean>} True if product is in order
   */
  async isProductInOrder(productName) {
    const items = await this.getOrderItems();
    return items.some(item => item.name === productName);
  }

  /**
   * Get the subtotal amount
   * @returns {Promise<string|null>} Subtotal amount or null
   */
  async getSubtotal() {
    try {
      const subtotalText = await this.getText(this.selectors.summarySubtotal);
      return subtotalText?.replace('Item total: ', '').trim();
    } catch (error) {
      return null;
    }
  }

  /**
   * Get the tax amount
   * @returns {Promise<string|null>} Tax amount or null
   */
  async getTax() {
    try {
      const taxText = await this.getText(this.selectors.summaryTax);
      return taxText?.replace('Tax: ', '').trim();
    } catch (error) {
      return null;
    }
  }

  /**
   * Get the total amount
   * @returns {Promise<string|null>} Total amount or null
   */
  async getTotal() {
    try {
      const totalText = await this.getText(this.selectors.summaryTotal);
      return totalText?.replace('Total: ', '').trim();
    } catch (error) {
      return null;
    }
  }

  /**
   * Wait for the overview page to load
   */
  async waitForOverviewPage() {
    await this.waitForElement(this.selectors.checkoutSummaryContainer);
  }

  /**
   * Check if currently on overview page
   * @returns {Promise<boolean>} True if on overview page
   */
  async isOnOverviewPage() {
    try {
      await this.waitForElement(this.selectors.checkoutSummaryContainer, { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = SauceDemoCheckoutOverviewPage;