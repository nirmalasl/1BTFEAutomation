/**
 * Sauce Demo Cart Page Object
 * Handles interactions with the shopping cart page
 */

const BasePage = require('./basePage');

class SauceDemoCartPage extends BasePage {
  /**
   * Constructor - Initialize page selectors and constants
   * @param {Page} page - Playwright page instance
   */
  constructor(page) {
    super(page);
    
    // Page element selectors
    this.selectors = {
      cartIcon: '.shopping_cart_link',
      cartBadge: '.shopping_cart_badge',
      cartContainer: '.cart_contents_container',
      cartItem: '.cart_item',
      cartItemName: '.inventory_item_name',
      cartItemPrice: '.inventory_item_price',
      continueShoppingButton: '#continue-shopping',
      checkoutButton: '#checkout',
      removeButton: '[data-test^="remove-"]',
      cartQuantity: '.cart_quantity',
      pageTitle: '.title'
    };
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
    await this.waitForElement(this.selectors.cartContainer);
  }

  /**
   * Get all items in the cart
   * @returns {Promise<Array>} Array of cart items with name, price, and quantity
   */
  async getCartItems() {
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
   * Check if a specific product is in the cart
   * @param {string} productName - Name of the product to check
   * @returns {Promise<boolean>} True if product is in cart
   */
  async isProductInCart(productName) {
    const items = await this.getCartItems();
    return items.some(item => item.name === productName);
  }

  /**
   * Check if the cart is empty
   * @returns {Promise<boolean>} True if cart is empty
   */
  async isCartEmpty() {
    const items = await this.getCartItems();
    return items.length === 0;
  }

  /**
   * Click the continue shopping button
   */
  async clickContinueShopping() {
    await this.click(this.selectors.continueShoppingButton);
  }

  /**
   * Click the checkout button
   */
  async clickCheckout() {
    await this.click(this.selectors.checkoutButton);
  }

  /**
   * Remove a specific product from the cart
   * @param {string} productName - Name of the product to remove
   */
  async removeProductFromCart(productName) {
    const cartItems = await this.page.locator(this.selectors.cartItem).all();
    
    for (const item of cartItems) {
      const name = await item.locator(this.selectors.cartItemName).textContent();
      if (name?.trim() === productName) {
        await item.locator(this.selectors.removeButton).click();
        break;
      }
    }
  }

  /**
   * Get the page title
   * @returns {Promise<string>} Page title text
   */
  async getPageTitle() {
    return await this.getText(this.selectors.pageTitle);
  }

  /**
   * Wait for the cart page to load
   */
  async waitForCartPage() {
    await this.waitForElement(this.selectors.cartContainer);
  }
}

module.exports = SauceDemoCartPage;