/**
 * Step Definitions for Sauce Demo Add Product Feature
 * Contains step implementations for cart operations and checkout process
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Page Object imports
const SauceDemoLoginPage = require('../../page_objects/sauceDemoLoginPage');
const SauceDemoInventoryPage = require('../../page_objects/sauceDemoInventoryPage');
const SauceDemoCartPage = require('../../page_objects/sauceDemoCartPage');
const SauceDemoCheckoutPage = require('../../page_objects/sauceDemoCheckoutPage');
const SauceDemoCheckoutOverviewPage = require('../../page_objects/sauceDemoCheckoutOverviewPage');
const SauceDemoCheckoutCompletePage = require('../../page_objects/sauceDemoCheckoutCompletePage');

// Constants
const DEFAULT_USER_CREDENTIALS = {
  USERNAME: 'standard_user',
  PASSWORD: 'secret_sauce'
};

const DEFAULT_CHECKOUT_INFO = {
  FIRST_NAME: 'John',
  LAST_NAME: 'Doe',
  POSTAL_CODE: '12345'
};

// Authentication Steps
Given('I login with valid credentials', async function () {
  this.loginPage = new SauceDemoLoginPage(this.page);
  
  await this.loginPage.enterUsername(DEFAULT_USER_CREDENTIALS.USERNAME);
  await this.loginPage.enterPassword(DEFAULT_USER_CREDENTIALS.PASSWORD);
  await this.loginPage.clickLoginButton();
  
  // Wait for navigation to inventory page
  this.inventoryPage = new SauceDemoInventoryPage(this.page);
  await this.inventoryPage.waitForPageLoad();
});

// Inventory Management Steps
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

// Cart Navigation Steps
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

// Checkout Initiation Steps
When('I click the checkout button', async function () {
  await this.cartPage.clickCheckout();
});

Then('I should be on the checkout page', async function () {
  this.checkoutPage = new SauceDemoCheckoutPage(this.page);
  await this.checkoutPage.waitForCheckoutPage();
  
  const pageTitle = await this.checkoutPage.getPageTitle();
  expect(pageTitle).toBe('Checkout: Your Information');
});

// Checkout Information Steps
When('I enter checkout information', async function () {
  await this.checkoutPage.enterCheckoutInformation(
    DEFAULT_CHECKOUT_INFO.FIRST_NAME,
    DEFAULT_CHECKOUT_INFO.LAST_NAME,
    DEFAULT_CHECKOUT_INFO.POSTAL_CODE
  );
});

When('I click continue', async function () {
  await this.checkoutPage.clickContinue();
});

// Order Review Steps
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

// Order Completion Steps
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