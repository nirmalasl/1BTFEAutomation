const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../../page_objects/loginPage');
const fs = require('fs');
const path = require('path');

// Load test data
const testDataPath = path.join(__dirname, '../../test_data/testData.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

Given('I navigate to Sauce Demo website', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigate(testData.urls.sauceDemo);
});

When('I enter username {string}', async function (username) {
    await this.loginPage.fill(this.loginPage.usernameInput, username);
});

When('I enter password {string}', async function (password) {
    await this.loginPage.fill(this.loginPage.passwordInput, password);
});

When('I enter username from test data {string}', async function (userType) {
    const username = testData.loginCredentials[userType].username;
    await this.loginPage.fill(this.loginPage.usernameInput, username);
});

When('I enter password from test data {string}', async function (userType) {
    const password = testData.loginCredentials[userType].password;
    await this.loginPage.fill(this.loginPage.passwordInput, password);
});

When('I enter credentials for scenario {string}', async function (scenarioName) {
    const scenario = testData.testScenarios[scenarioName];
    await this.loginPage.fill(this.loginPage.usernameInput, scenario.username);
    await this.loginPage.fill(this.loginPage.passwordInput, scenario.password);
});

When('I click on the login button', async function () {
    await this.loginPage.click(this.loginPage.loginButton);
});

Then('I should be logged in successfully', async function () {
    await this.loginPage.isLoggedIn();
});

Then('I should see the expected result for {string}', async function (userType) {
    // This can be expanded based on the expected behavior for different user types
    if (userType === 'validUser') {
        await this.loginPage.isLoggedIn();
    } else if (userType === 'invalidUser' || userType === 'lockedUser') {
        // Add logic to verify error messages or failed login state
        // For now, we'll just check if still on login page
        await this.loginPage.isLoggedOut();
    }
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