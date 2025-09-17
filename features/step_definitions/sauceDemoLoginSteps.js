/**
 * Step Definitions for Sauce Demo Login Feature
 * Contains step implementations for authentication and login validation
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Page Object imports
const SauceDemoLoginPage = require('../../page_objects/sauceDemoLoginPage');
const SauceDemoInventoryPage = require('../../page_objects/sauceDemoInventoryPage');

// Constants
const EXPECTED_INVENTORY_URL_FRAGMENT = 'inventory.html';
const EXPECTED_PRODUCTS_TITLE = 'Products';

// Navigation Steps
Given('I navigate to the Sauce Demo login page', async function () {
  this.loginPage = new SauceDemoLoginPage(this.page);
  await this.loginPage.navigate();
});

// Authentication Input Steps
When('I enter username {string}', async function (username) {
  await this.loginPage.enterUsername(username);
});

When('I enter password {string}', async function (password) {
  await this.loginPage.enterPassword(password);
});

When('I click the login button', async function () {
  await this.loginPage.clickLoginButton();
});

// Success Validation Steps
Then('I should be redirected to the inventory page', async function () {
  this.inventoryPage = new SauceDemoInventoryPage(this.page);
  await this.inventoryPage.waitForPageLoad();
  
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain(EXPECTED_INVENTORY_URL_FRAGMENT);
});

Then('I should see the products page title', async function () {
  this.inventoryPage = new SauceDemoInventoryPage(this.page);
  const title = await this.inventoryPage.getPageTitle();
  expect(title).toBe(EXPECTED_PRODUCTS_TITLE);
});

// Error Validation Steps
Then('I should see an error message {string}', async function (expectedMessage) {
  const errorMessage = await this.loginPage.getErrorMessage();
  expect(errorMessage).toBe(expectedMessage);
});