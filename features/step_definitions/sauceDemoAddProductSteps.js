const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SauceDemoLoginPage = require('../../page_objects/sauceDemoLoginPage');
const SauceDemoInventoryPage = require('../../page_objects/sauceDemoInventoryPage');
const SauceDemoCartPage = require('../../page_objects/sauceDemoCartPage');
const SauceDemoCheckoutPage = require('../../page_objects/sauceDemoCheckoutPage');
const SauceDemoCheckoutOverviewPage = require('../../page_objects/sauceDemoCheckoutOverviewPage');
const SauceDemoCheckoutCompletePage = require('../../page_objects/sauceDemoCheckoutCompletePage');

Given('I login with valid credentials', async function () {
  this.loginPage = new SauceDemoLoginPage(this.page);
  await this.loginPage.enterUsername('standard_user');
  await this.loginPage.enterPassword('secret_sauce');
  await this.loginPage.clickLoginButton();
  
  // Wait for navigation to inventory page
  this.inventoryPage = new SauceDemoInventoryPage(this.page);
  await this.inventoryPage.waitForPageLoad();
});

When('I add {string} to cart', async function (productName) {
  this.inventoryPage = new SauceDemoInventoryPage(this.page);
  this.selectedProduct = productName;
  await this.inventoryPage.addProductToCart(productName);
});

Then('the product should be added to cart', async function () {
  const isInCart = await this.inventoryPage.isProductInCart(this.selectedProduct);
  expect(isInCart).toBe(true);
});

Then('the cart badge should show {string}', async function (expectedCount) {
  const cartBadgeVisible = await this.inventoryPage.isCartBadgeVisible();
  expect(cartBadgeVisible).toBe(true);
  
  const cartCount = await this.inventoryPage.getCartBadgeCount();
  expect(cartCount).toBe(expectedCount);
});

When('I click on the cart icon', async function () {
  await this.inventoryPage.clickCartIcon();
});

Then('I should be on the cart page', async function () {
  this.cartPage = new SauceDemoCartPage(this.page);
  await this.cartPage.waitForCartPage();
  const pageTitle = await this.cartPage.getPageTitle();
  expect(pageTitle).toBe('Your Cart');
});

Then('the cart should contain {string}', async function (productName) {
  const isInCart = await this.cartPage.isProductInCart(productName);
  expect(isInCart).toBe(true);
});

When('I click the checkout button', async function () {
  await this.cartPage.clickCheckout();
});

Then('I should be on the checkout page', async function () {
  this.checkoutPage = new SauceDemoCheckoutPage(this.page);
  await this.checkoutPage.waitForCheckoutPage();
  const pageTitle = await this.checkoutPage.getPageTitle();
  expect(pageTitle).toBe('Checkout: Your Information');
});

When('I enter checkout information', async function () {
  await this.checkoutPage.enterCheckoutInformation('John', 'Doe', '12345');
});

When('I click continue', async function () {
  await this.checkoutPage.clickContinue();
});

Then('I should be on the checkout overview page', async function () {
  this.overviewPage = new SauceDemoCheckoutOverviewPage(this.page);
  await this.overviewPage.waitForOverviewPage();
  const pageTitle = await this.overviewPage.getPageTitle();
  expect(pageTitle).toBe('Checkout: Overview');
});

Then('the order should contain {string}', async function (productName) {
  const isInOrder = await this.overviewPage.isProductInOrder(productName);
  expect(isInOrder).toBe(true);
});

When('I click finish', async function () {
  await this.overviewPage.clickFinish();
});

Then('I should be on the checkout complete page', async function () {
  this.completePage = new SauceDemoCheckoutCompletePage(this.page);
  await this.completePage.waitForCompletePage();
  const pageTitle = await this.completePage.getPageTitle();
  expect(pageTitle).toBe('Checkout: Complete!');
});

Then('I should see the order confirmation message', async function () {
  const isComplete = await this.completePage.isOrderComplete();
  expect(isComplete).toBe(true);
});