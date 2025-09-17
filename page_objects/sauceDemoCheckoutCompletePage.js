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
    await this.page.click(this.backHomeButton);
  }

  async getPageTitle() {
    return await this.page.textContent(this.pageTitle);
  }

  async getCompleteHeader() {
    try {
      return await this.page.textContent(this.completeHeader);
    } catch (error) {
      return null;
    }
  }

  async getCompleteText() {
    try {
      return await this.page.textContent(this.completeText);
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
    await this.page.waitForSelector(this.checkoutCompleteContainer);
  }

  async isOnCompletePage() {
    try {
      await this.page.waitForSelector(this.checkoutCompleteContainer, { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async isPonyExpressImageVisible() {
    try {
      return await this.page.isVisible(this.ponyExpressImage);
    } catch (error) {
      return false;
    }
  }
}

module.exports = SauceDemoCheckoutCompletePage;