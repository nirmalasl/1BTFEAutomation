/**
 * Sauce Demo Checkout Page Object
 * Handles interactions with the checkout information page
 */

const BasePage = require('./basePage');

class SauceDemoCheckoutPage extends BasePage {
  /**
   * Constructor - Initialize page selectors and constants
   * @param {Page} page - Playwright page instance
   */
  constructor(page) {
    super(page);
    
    // Page element selectors
    this.selectors = {
      firstNameInput: '#first-name',
      lastNameInput: '#last-name',
      postalCodeInput: '#postal-code',
      continueButton: '#continue',
      cancelButton: '#cancel',
      errorMessage: '[data-test="error"]',
      pageTitle: '.title',
      checkoutContainer: '.checkout_info_container'
    };
  }

  /**
   * Enter first name in the checkout form
   * @param {string} firstName - First name to enter
   */
  async enterFirstName(firstName) {
    await this.fill(this.selectors.firstNameInput, firstName);
  }

  /**
   * Enter last name in the checkout form
   * @param {string} lastName - Last name to enter
   */
  async enterLastName(lastName) {
    await this.fill(this.selectors.lastNameInput, lastName);
  }

  /**
   * Enter postal code in the checkout form
   * @param {string} postalCode - Postal code to enter
   */
  async enterPostalCode(postalCode) {
    await this.fill(this.selectors.postalCodeInput, postalCode);
  }

  /**
   * Enter all checkout information
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {string} postalCode - Postal code
   */
  async enterCheckoutInformation(firstName, lastName, postalCode) {
    if (firstName) await this.enterFirstName(firstName);
    if (lastName) await this.enterLastName(lastName);
    if (postalCode) await this.enterPostalCode(postalCode);
  }

  /**
   * Click the continue button
   */
  async clickContinue() {
    await this.click(this.selectors.continueButton);
  }

  /**
   * Click the cancel button
   */
  async clickCancel() {
    await this.click(this.selectors.cancelButton);
  }

  /**
   * Get error message if displayed
   * @returns {Promise<string|null>} Error message or null
   */
  async getErrorMessage() {
    try {
      return await this.getText(this.selectors.errorMessage);
    } catch (error) {
      return null;
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
   * Wait for the checkout page to load
   */
  async waitForCheckoutPage() {
    await this.waitForElement(this.selectors.checkoutContainer);
  }

  /**
   * Check if currently on checkout page
   * @returns {Promise<boolean>} True if on checkout page
   */
  async isOnCheckoutPage() {
    try {
      await this.waitForElement(this.selectors.checkoutContainer, { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = SauceDemoCheckoutPage;