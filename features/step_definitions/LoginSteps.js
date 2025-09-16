const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../../page_objects/loginPage');
const Logger = require('../../utils/Logger');
const fs = require('fs');
const path = require('path');

// Load test data
const testDataPath = path.join(__dirname, '../../test_data/testData.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
Logger.setup('TestData', `Loaded test data from: ${testDataPath}`);

Given('I navigate to Sauce Demo website', async function () {
    Logger.stepStart('Navigate to Sauce Demo website', 'Given');
    try {
        this.loginPage = new LoginPage(this.page);
        Logger.dataUsage('URL', 'sauceDemo', testData.urls.sauceDemo);
        await this.loginPage.navigate(testData.urls.sauceDemo);
        Logger.stepEnd('Navigate to Sauce Demo website');
    } catch (error) {
        Logger.stepError('Navigate to Sauce Demo website', error);
        throw error;
    }
});

When('I enter username {string}', async function (username) {
    Logger.stepStart(`Enter username: ${username}`, 'When');
    try {
        await this.loginPage.fill(this.loginPage.usernameInput, username);
        Logger.stepEnd(`Enter username: ${username}`);
    } catch (error) {
        Logger.stepError(`Enter username: ${username}`, error);
        throw error;
    }
});

When('I enter password {string}', async function (password) {
    Logger.stepStart('Enter password', 'When');
    try {
        await this.loginPage.fill(this.loginPage.passwordInput, password);
        Logger.stepEnd('Enter password');
    } catch (error) {
        Logger.stepError('Enter password', error);
        throw error;
    }
});

When('I enter username from test data {string}', async function (userType) {
    Logger.stepStart(`Enter username from test data: ${userType}`, 'When');
    try {
        const username = testData.loginCredentials[userType].username;
        Logger.dataUsage('loginCredentials', `${userType}.username`, username);
        await this.loginPage.fill(this.loginPage.usernameInput, username);
        Logger.stepEnd(`Enter username from test data: ${userType}`);
    } catch (error) {
        Logger.stepError(`Enter username from test data: ${userType}`, error);
        throw error;
    }
});

When('I enter password from test data {string}', async function (userType) {
    Logger.stepStart(`Enter password from test data: ${userType}`, 'When');
    try {
        const password = testData.loginCredentials[userType].password;
        Logger.dataUsage('loginCredentials', `${userType}.password`);
        await this.loginPage.fill(this.loginPage.passwordInput, password);
        Logger.stepEnd(`Enter password from test data: ${userType}`);
    } catch (error) {
        Logger.stepError(`Enter password from test data: ${userType}`, error);
        throw error;
    }
});

When('I enter credentials for scenario {string}', async function (scenarioName) {
    Logger.stepStart(`Enter credentials for scenario: ${scenarioName}`, 'When');
    try {
        const scenario = testData.testScenarios[scenarioName];
        Logger.dataUsage('testScenarios', scenarioName, `username: ${scenario.username}`);
        await this.loginPage.fill(this.loginPage.usernameInput, scenario.username);
        await this.loginPage.fill(this.loginPage.passwordInput, scenario.password);
        Logger.stepEnd(`Enter credentials for scenario: ${scenarioName}`);
    } catch (error) {
        Logger.stepError(`Enter credentials for scenario: ${scenarioName}`, error);
        throw error;
    }
});

When('I click on the login button', async function () {
    Logger.stepStart('Click on login button', 'When');
    try {
        await this.loginPage.click(this.loginPage.loginButton);
        Logger.stepEnd('Click on login button');
    } catch (error) {
        Logger.stepError('Click on login button', error);
        throw error;
    }
});

Then('I should be logged in successfully', async function () {
    Logger.stepStart('Verify successful login', 'Then');
    try {
        await this.loginPage.isLoggedIn();
        Logger.stepEnd('Verify successful login');
    } catch (error) {
        Logger.stepError('Verify successful login', error);
        throw error;
    }
});

Then('I should see the expected result for {string}', async function (userType) {
    Logger.stepStart(`Verify expected result for: ${userType}`, 'Then');
    try {
        // This can be expanded based on the expected behavior for different user types
        if (userType === 'validUser') {
            await this.loginPage.isLoggedIn();
        } else if (userType === 'invalidUser' || userType === 'lockedUser') {
            // Add logic to verify error messages or failed login state
            // For now, we'll just check if still on login page
            await this.loginPage.isLoggedOut();
        }
        Logger.stepEnd(`Verify expected result for: ${userType}`);
    } catch (error) {
        Logger.stepError(`Verify expected result for: ${userType}`, error);
        throw error;
    }
});

When('I click on burger menu', async function () {
    Logger.stepStart('Click on burger menu', 'When');
    try {
        await this.loginPage.click(this.loginPage.burgerMenu);
        Logger.stepEnd('Click on burger menu');
    } catch (error) {
        Logger.stepError('Click on burger menu', error);
        throw error;
    }
});

When('I click on logout link', async function () {
    Logger.stepStart('Click on logout link', 'When');
    try {
        await this.loginPage.click(this.loginPage.logoutLink);
        Logger.stepEnd('Click on logout link');
    } catch (error) {
        Logger.stepError('Click on logout link', error);
        throw error;
    }
});

Then('I should be logged out successfully', async function () {
    Logger.stepStart('Verify successful logout', 'Then');
    try {
        await this.loginPage.isLoggedOut();
        Logger.stepEnd('Verify successful logout');
    } catch (error) {
        Logger.stepError('Verify successful logout', error);
        throw error;
    }
});

// Browser management steps
When('I close the browser', async function () {
    Logger.stepStart('Close the browser', 'When');
    try {
        if (this.page && !this.page.isClosed()) {
            await this.page.close();
            Logger.browserAction('Page closed manually');
        }
        if (this.browser) {
            await this.browser.close();
            Logger.browserAction('Browser closed manually');
        }
        Logger.stepEnd('Close the browser');
    } catch (error) {
        Logger.stepError('Close the browser', error);
        throw error;
    }
});

Then('the browser should be closed', async function () {
    Logger.stepStart('Verify browser is closed', 'Then');
    try {
        if (this.page) {
            expect(this.page.isClosed()).toBeTruthy();
        }
        Logger.stepEnd('Verify browser is closed');
    } catch (error) {
        Logger.stepError('Verify browser is closed', error);
        throw error;
    }
});