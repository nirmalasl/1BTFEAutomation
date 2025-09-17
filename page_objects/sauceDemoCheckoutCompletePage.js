const BasePage = require('./basePage');

class SauceDemoCheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page);
    this.backHomeButton = '#back-to-products';
    this.pageTitle = '.title';
    this.completeHeader = '.complete-header';
    this.completeText = '.complete-text';
    this.checkoutCompleteContainer = '.checkout_complete_container';
    this.ponyExpressImage = '.pony_express';
  }

  async clickBackHome() {
    await this.click(this.backHomeButton);
  }

  async getPageTitle() {
    return await this.getText(this.pageTitle);
  }

  async getCompleteHeader() {
    try {
      return await this.getText(this.completeHeader);
    } catch (error) {
      return null;
    }
  }

  async getCompleteText() {
    try {
      return await this.getText(this.completeText);
    } catch (error) {
      return null;
    }
  }

  async isOrderComplete() {
    try {
      const header = await this.getCompleteHeader();
      return header?.includes('Thank you for your order!') || header?.includes('THANK YOU FOR YOUR ORDER');
    } catch (error) {
      return false;
    }
  }

  async waitForCompletePage() {
    await this.waitForElement(this.checkoutCompleteContainer);
  }

  async isOnCompletePage() {
    try {
      await this.waitForElement(this.checkoutCompleteContainer, { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isPonyExpressImageVisible() {
    try {
      return await this.isVisible(this.ponyExpressImage);
    } catch (error) {
      return false;
    }
  }
}

module.exports = SauceDemoCheckoutCompletePage;