const BasePage = require('./basePage');

class SauceDemoCheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '#continue';
    this.cancelButton = '#cancel';
    this.errorMessage = '[data-test="error"]';
    this.pageTitle = '.title';
    this.checkoutContainer = '.checkout_info_container';
  }

  async enterFirstName(firstName) {
    await this.page.fill(this.firstNameInput, firstName);
  }

  async enterLastName(lastName) {
    await this.page.fill(this.lastNameInput, lastName);
  }

  async enterPostalCode(postalCode) {
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async enterCheckoutInformation(firstName, lastName, postalCode) {
    if (firstName) await this.enterFirstName(firstName);
    if (lastName) await this.enterLastName(lastName);
    if (postalCode) await this.enterPostalCode(postalCode);
  }

  async clickContinue() {
    await this.page.click(this.continueButton);
  }

  async clickCancel() {
    await this.page.click(this.cancelButton);
  }

  async getErrorMessage() {
    try {
      return await this.page.textContent(this.errorMessage);
    } catch (error) {
      return null;
    }
  }

  async getPageTitle() {
    return await this.page.textContent(this.pageTitle);
  }

  async waitForCheckoutPage() {
    await this.page.waitForSelector(this.checkoutContainer);
  }

  async isOnCheckoutPage() {
    try {
      await this.page.waitForSelector(this.checkoutContainer, { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = SauceDemoCheckoutPage;