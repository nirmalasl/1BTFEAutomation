const BasePage = require('./basePage');

class SauceDemoCheckoutOverviewPage extends BasePage {
  constructor(page) {
    super(page);
    this.finishButton = '#finish';
    this.cancelButton = '#cancel';
    this.pageTitle = '.title';
    this.cartItem = '.cart_item';
    this.cartItemName = '.inventory_item_name';
    this.cartItemPrice = '.inventory_item_price';
    this.cartQuantity = '.cart_quantity';
    this.summaryInfo = '.summary_info';
    this.summarySubtotal = '.summary_subtotal_label';
    this.summaryTax = '.summary_tax_label';
    this.summaryTotal = '.summary_total_label';
    this.checkoutSummaryContainer = '.checkout_summary_container';
  }

  async clickFinish() {
    await this.click(this.finishButton);
  }

  async clickCancel() {
    await this.click(this.cancelButton);
  }

  async getPageTitle() {
    return await this.getText(this.pageTitle);
  }

  async getOrderItems() {
    const items = [];
    const cartItems = await this.page.locator(this.cartItem).all();
    
    for (const item of cartItems) {
      const name = await item.locator(this.cartItemName).textContent();
      const price = await item.locator(this.cartItemPrice).textContent();
      const quantity = await item.locator(this.cartQuantity).textContent();
      
      items.push({
        name: name?.trim(),
        price: price?.trim(),
        quantity: quantity?.trim()
      });
    }
    
    return items;
  }

  async isProductInOrder(productName) {
    const items = await this.getOrderItems();
    return items.some(item => item.name === productName);
  }

  async getSubtotal() {
    try {
      const subtotalText = await this.getText(this.summarySubtotal);
      return subtotalText?.replace('Item total: ', '').trim();
    } catch (error) {
      return null;
    }
  }

  async getTax() {
    try {
      const taxText = await this.getText(this.summaryTax);
      return taxText?.replace('Tax: ', '').trim();
    } catch (error) {
      return null;
    }
  }

  async getTotal() {
    try {
      const totalText = await this.getText(this.summaryTotal);
      return totalText?.replace('Total: ', '').trim();
    } catch (error) {
      return null;
    }
  }

  async waitForOverviewPage() {
    await this.waitForElement(this.checkoutSummaryContainer);
  }

  async isOnOverviewPage() {
    try {
      await this.waitForElement(this.checkoutSummaryContainer, { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = SauceDemoCheckoutOverviewPage;