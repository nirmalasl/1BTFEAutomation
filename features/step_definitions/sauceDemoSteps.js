const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SauceDemoLoginPage = require('../../page_objects/sauceDemoLoginPage');
const SauceDemoInventoryPage = require('../../page_objects/sauceDemoInventoryPage');

Given('I navigate to the Sauce Demo login page', async function () {
  this.loginPage = new SauceDemoLoginPage(this.page);
  await this.loginPage.navigate();
});

When('I enter username {string}', async function (username) {
  await this.loginPage.enterUsername(username);
});

When('I enter password {string}', async function (password) {
  await this.loginPage.enterPassword(password);
});

When('I click the login button', async function () {
  await this.loginPage.clickLoginButton();
});

Then('I should be redirected to the inventory page', async function () {
  this.inventoryPage = new SauceDemoInventoryPage(this.page);
  await this.inventoryPage.waitForPageLoad();
  const currentUrl = await this.page.url();
  expect(currentUrl).toContain('inventory.html');
});

Then('I should see the products page title', async function () {
  this.inventoryPage = new SauceDemoInventoryPage(this.page);
  const title = await this.inventoryPage.getPageTitle();
  expect(title).toBe('Products');
});

Then('I should see an error message {string}', async function (expectedMessage) {
  const errorMessage = await this.loginPage.getErrorMessage();
  expect(errorMessage).toBe(expectedMessage);
});