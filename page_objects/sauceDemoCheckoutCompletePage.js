/**
 * Sauce Demo Checkout Complete Page Object
 * Handles interactions with the order completion page
 */

const BasePage = require('./basePage');

class SauceDemoCheckoutCompletePage extends BasePage {
  /**
   * Constructor - Initialize page selectors and constants
   * @param {Page} page - Playwright page instance
   */
  constructor(page) {
    super(page);
    
    // Page element selectors
    this.selectors = {
      backHomeButton: '#back-to-products',
      pageTitle: '.title',
      completeHeader: '.complete-header',
      completeText: '.complete-text',
      checkoutCompleteContainer: '.checkout_complete_container',
      ponyExpressImage: '.pony_express'
    };
  }

  /**
   * Click the back to home button
   */
  async clickBackHome() {
    await this.click(this.selectors.backHomeButton);
  }

  /**
   * Get the page title
   * @returns {Promise<string>} Page title text
   */
  async getPageTitle() {
    return await this.getText(this.selectors.pageTitle);
  }

  /**
   * Get the completion header text
   * @returns {Promise<string|null>} Header text or null
   */
  async getCompleteHeader() {
    try {
      return await this.getText(this.selectors.completeHeader);
    } catch (error) {
      return null;
    }
  }

  /**
   * Get the completion description text
   * @returns {Promise<string|null>} Description text or null
   */
  async getCompleteText() {
    try {
      return await this.getText(this.selectors.completeText);
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if the order is complete
   * @returns {Promise<boolean>} True if order is complete
   */
  async isOrderComplete() {
    try {
      const header = await this.getCompleteHeader();
      return header?.includes('Thank you for your order!') || header?.includes('THANK YOU FOR YOUR ORDER');
    } catch (error) {
      return false;
    }
  }

  /**
   * Wait for the complete page to load
   */
  async waitForCompletePage() {
    await this.waitForElement(this.selectors.checkoutCompleteContainer);
  }

  /**
   * Check if currently on complete page
   * @returns {Promise<boolean>} True if on complete page
   */
  async isOnCompletePage() {
    try {
      await this.waitForElement(this.selectors.checkoutCompleteContainer, { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if the pony express image is visible
   * @returns {Promise<boolean>} True if image is visible
   */
  async isPonyExpressImageVisible() {
    try {
      return await this.isVisible(this.selectors.ponyExpressImage);
    } catch (error) {
      return false;
    }
  }
}

module.exports = SauceDemoCheckoutCompletePage;