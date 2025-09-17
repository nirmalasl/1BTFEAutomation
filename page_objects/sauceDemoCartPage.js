const BasePage = require('./basePage');

class SauceDemoCartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartIcon = '.shopping_cart_link';
    this.cartBadge = '.shopping_cart_badge';
    this.cartContainer = '.cart_contents_container';
    this.cartItem = '.cart_item';
    this.cartItemName = '.inventory_item_name';
    this.cartItemPrice = '.inventory_item_price';
    this.continueShoppingButton = '#continue-shopping';
    this.checkoutButton = '#checkout';
    this.removeButton = '[data-test^="remove-"]';
    this.cartQuantity = '.cart_quantity';
    this.pageTitle = '.title';
  }

  async getCartBadgeCount() {
    try {
      const badge = await this.page.locator(this.cartBadge);
      if (await badge.isVisible()) {
        return await badge.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async isCartBadgeVisible() {
    try {
      return await this.page.locator(this.cartBadge).isVisible();
    } catch (error) {
      return false;
    }
  }

  async clickCartIcon() {
    await this.click(this.cartIcon);
    await this.waitForElement(this.cartContainer);
  }

  async getCartItems() {
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

  async isProductInCart(productName) {
    const items = await this.getCartItems();
    return items.some(item => item.name === productName);
  }

  async isCartEmpty() {
    const items = await this.getCartItems();
    return items.length === 0;
  }

  async clickContinueShopping() {
    await this.click(this.continueShoppingButton);
  }

  async clickCheckout() {
    await this.click(this.checkoutButton);
  }

  async removeProductFromCart(productName) {
    const cartItems = await this.page.locator(this.cartItem).all();
    
    for (const item of cartItems) {
      const name = await item.locator(this.cartItemName).textContent();
      if (name?.trim() === productName) {
        await item.locator(this.removeButton).click();
        break;
      }
    }
  }

  async getPageTitle() {
    return await this.getText(this.pageTitle);
  }

  async waitForCartPage() {
    await this.waitForElement(this.cartContainer);
  }
}

module.exports = SauceDemoCartPage;