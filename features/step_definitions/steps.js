const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../../page_objects/loginPage');

Given('I navigate to Sauce Demo website', async function () {
    this.loginPage = new LoginPage();
    await this.loginPage.navigate('https://www.saucedemo.com/v1/index.html');
});

When('I enter username {string}', async function (username) {
    await this.loginPage.fill(this.loginPage.usernameInput, username);
});

When('I enter password {string}', async function (password) {
    await this.loginPage.fill(this.loginPage.passwordInput, password);
});

When('I click on the login button', async function () {
    await this.loginPage.click(this.loginPage.loginButton);
});

Then('I should be logged in successfully', async function () {
    await this.loginPage.isLoggedIn();
});

When('I click on burger menu', async function () {
    await this.loginPage.click(this.loginPage.burgerMenu);
});

When('I click on logout link', async function () {
    await this.loginPage.click(this.loginPage.logoutLink);
});

Then('I should be logged out successfully', async function () {
    await this.loginPage.isLoggedOut();
});

Then('I close the browser', async function () {
    await this.loginPage.closeBrowser();
});