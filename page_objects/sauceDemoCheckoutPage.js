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
    await this.fill(this.firstNameInput, firstName);
  }

  async enterLastName(lastName) {
    await this.fill(this.lastNameInput, lastName);
  }

  async enterPostalCode(postalCode) {
    await this.fill(this.postalCodeInput, postalCode);
  }

  async enterCheckoutInformation(firstName, lastName, postalCode) {
    if (firstName) await this.enterFirstName(firstName);
    if (lastName) await this.enterLastName(lastName);
    if (postalCode) await this.enterPostalCode(postalCode);
  }

  async clickContinue() {
    await this.click(this.continueButton);
  }

  async clickCancel() {
    await this.click(this.cancelButton);
  }

  async getErrorMessage() {
    try {
      return await this.getText(this.errorMessage);
    } catch (error) {
      return null;
    }
  }

  async getPageTitle() {
    return await this.getText(this.pageTitle);
  }

  async waitForCheckoutPage() {
    await this.waitForElement(this.checkoutContainer);
  }

  async isOnCheckoutPage() {
    try {
      await this.waitForElement(this.checkoutContainer, { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = SauceDemoCheckoutPage;