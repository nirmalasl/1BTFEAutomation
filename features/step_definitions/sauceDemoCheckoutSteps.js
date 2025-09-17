const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SauceDemoLoginPage = require('../../page_objects/sauceDemoLoginPage');
const SauceDemoInventoryPage = require('../../page_objects/sauceDemoInventoryPage');
const SauceDemoCartPage = require('../../page_objects/sauceDemoCartPage');
const SauceDemoCheckoutPage = require('../../page_objects/sauceDemoCheckoutPage');
const SauceDemoCheckoutOverviewPage = require('../../page_objects/sauceDemoCheckoutOverviewPage');
const SauceDemoCheckoutCompletePage = require('../../page_objects/sauceDemoCheckoutCompletePage');

// Helper step for logging in with valid credentials
Given('I login with valid credentials', async function () {
  this.loginPage = new SauceDemoLoginPage(this.page);
  await this.loginPage.enterUsername('standard_user');
  await this.loginPage.enterPassword('secret_sauce');
  await this.loginPage.clickLoginButton();
  
  this.inventoryPage = new SauceDemoInventoryPage(this.page);
  await this.inventoryPage.waitForPageLoad();
});

// Product management steps
When('I add {string} to cart', async function (productName) {
  if (!this.inventoryPage) {
    this.inventoryPage = new SauceDemoInventoryPage(this.page);
  }
  await this.inventoryPage.addProductToCart(productName);
});

When('I remove {string} from cart', async function (productName) {
  if (!this.inventoryPage) {
    this.inventoryPage = new SauceDemoInventoryPage(this.page);
  }
  await this.inventoryPage.removeProductFromCart(productName);
});

// Cart badge verification steps
Then('the cart badge should show {string}', async function (expectedCount) {
  if (!this.inventoryPage) {
    this.inventoryPage = new SauceDemoInventoryPage(this.page);
  }
  const cartCount = await this.inventoryPage.getCartBadgeCount();
  expect(cartCount).toBe(expectedCount);
});

Then('the cart badge should not be visible', async function () {
  if (!this.inventoryPage) {
    this.inventoryPage = new SauceDemoInventoryPage(this.page);
  }
  const isVisible = await this.inventoryPage.isCartBadgeVisible();
  expect(isVisible).toBe(false);
});

Then('the product should be added to cart', async function () {
  if (!this.inventoryPage) {
    this.inventoryPage = new SauceDemoInventoryPage(this.page);
  }
  const cartCount = await this.inventoryPage.getCartBadgeCount();
  expect(cartCount).not.toBeNull();
  expect(parseInt(cartCount)).toBeGreaterThan(0);
});

// Cart navigation steps
When('I click on the cart icon', async function () {
  if (!this.inventoryPage) {
    this.inventoryPage = new SauceDemoInventoryPage(this.page);
  }
  await this.inventoryPage.clickCartIcon();
  this.cartPage = new SauceDemoCartPage(this.page);
  await this.cartPage.waitForCartPage();
});

// Cart page verification steps
Then('I should see the cart page', async function () {
  if (!this.cartPage) {
    this.cartPage = new SauceDemoCartPage(this.page);
  }
  const title = await this.cartPage.getPageTitle();
  expect(title).toBe('Your Cart');
});

Then('I should see {string} in cart', async function (productName) {
  if (!this.cartPage) {
    this.cartPage = new SauceDemoCartPage(this.page);
  }
  const isInCart = await this.cartPage.isProductInCart(productName);
  expect(isInCart).toBe(true);
});

Then('the cart should be empty', async function () {
  if (!this.cartPage) {
    this.cartPage = new SauceDemoCartPage(this.page);
    await this.cartPage.clickCartIcon();
  }
  const isEmpty = await this.cartPage.isCartEmpty();
  expect(isEmpty).toBe(true);
});

// Cart action steps
When('I click {string} button', async function (buttonName) {
  switch (buttonName) {
    case 'Continue Shopping':
      if (!this.cartPage) {
        this.cartPage = new SauceDemoCartPage(this.page);
      }
      await this.cartPage.clickContinueShopping();
      break;
    case 'Checkout':
      if (!this.cartPage) {
        this.cartPage = new SauceDemoCartPage(this.page);
      }
      await this.cartPage.clickCheckout();
      this.checkoutPage = new SauceDemoCheckoutPage(this.page);
      await this.checkoutPage.waitForCheckoutPage();
      break;
    case 'Continue':
      if (!this.checkoutPage) {
        this.checkoutPage = new SauceDemoCheckoutPage(this.page);
      }
      await this.checkoutPage.clickContinue();
      break;
    case 'Cancel':
      if (this.checkoutPage) {
        await this.checkoutPage.clickCancel();
      } else if (this.checkoutOverviewPage) {
        await this.checkoutOverviewPage.clickCancel();
      }
      break;
    case 'Finish':
      if (!this.checkoutOverviewPage) {
        this.checkoutOverviewPage = new SauceDemoCheckoutOverviewPage(this.page);
      }
      await this.checkoutOverviewPage.clickFinish();
      this.checkoutCompletePage = new SauceDemoCheckoutCompletePage(this.page);
      await this.checkoutCompletePage.waitForCompletePage();
      break;
    default:
      throw new Error(`Unknown button: ${buttonName}`);
  }
});

// Helper step for proceeding to checkout
Given('I proceed to checkout', async function () {
  if (!this.inventoryPage) {
    this.inventoryPage = new SauceDemoInventoryPage(this.page);
  }
  await this.inventoryPage.clickCartIcon();
  this.cartPage = new SauceDemoCartPage(this.page);
  await this.cartPage.waitForCartPage();
  await this.cartPage.clickCheckout();
  this.checkoutPage = new SauceDemoCheckoutPage(this.page);
  await this.checkoutPage.waitForCheckoutPage();
});

// Checkout information steps
Then('I should see the checkout information page', async function () {
  if (!this.checkoutPage) {
    this.checkoutPage = new SauceDemoCheckoutPage(this.page);
  }
  const title = await this.checkoutPage.getPageTitle();
  expect(title).toBe('Checkout: Your Information');
});

When('I enter checkout information:', async function (dataTable) {
  if (!this.checkoutPage) {
    this.checkoutPage = new SauceDemoCheckoutPage(this.page);
  }
  const data = dataTable.hashes()[0];
  await this.checkoutPage.enterCheckoutInformation(
    data.firstName,
    data.lastName,
    data.postalCode
  );
});

When('I click {string} button without entering information', async function (buttonName) {
  if (buttonName === 'Continue') {
    if (!this.checkoutPage) {
      this.checkoutPage = new SauceDemoCheckoutPage(this.page);
    }
    await this.checkoutPage.clickContinue();
  }
});

Then('I should see error message {string}', async function (expectedMessage) {
  if (!this.checkoutPage) {
    this.checkoutPage = new SauceDemoCheckoutPage(this.page);
  }
  const errorMessage = await this.checkoutPage.getErrorMessage();
  expect(errorMessage).toContain(expectedMessage);
});

// Checkout overview steps
Then('I should see the checkout overview page', async function () {
  this.checkoutOverviewPage = new SauceDemoCheckoutOverviewPage(this.page);
  await this.checkoutOverviewPage.waitForOverviewPage();
  const title = await this.checkoutOverviewPage.getPageTitle();
  expect(title).toBe('Checkout: Overview');
});

Then('I should see order summary with {string}', async function (productName) {
  if (!this.checkoutOverviewPage) {
    this.checkoutOverviewPage = new SauceDemoCheckoutOverviewPage(this.page);
  }
  const isInOrder = await this.checkoutOverviewPage.isProductInOrder(productName);
  expect(isInOrder).toBe(true);
});

// Checkout complete steps
Then('I should see the checkout complete page', async function () {
  if (!this.checkoutCompletePage) {
    this.checkoutCompletePage = new SauceDemoCheckoutCompletePage(this.page);
  }
  const title = await this.checkoutCompletePage.getPageTitle();
  expect(title).toBe('Checkout: Complete!');
});

Then('I should see {string} message', async function (expectedMessage) {
  if (!this.checkoutCompletePage) {
    this.checkoutCompletePage = new SauceDemoCheckoutCompletePage(this.page);
  }
  const header = await this.checkoutCompletePage.getCompleteHeader();
  expect(header).toContain(expectedMessage);
});

// Navigation verification steps
Then('I should be redirected to the cart page', async function () {
  this.cartPage = new SauceDemoCartPage(this.page);
  const title = await this.cartPage.getPageTitle();
  expect(title).toBe('Your Cart');
});