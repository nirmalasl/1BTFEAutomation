const BasePage = require('./basePage');
const ConfigUtil = require('../utils/ConfigUtil');

class SauceDemoLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      usernameInput: '[data-test="username"]',
      passwordInput: '[data-test="password"]',
      loginButton: '[data-test="login-button"]',
      errorMessage: '[data-test="error"]'
    };
    // Use base URL from Playwright configuration
    this.url = ConfigUtil.getBaseUrl();
  }

  async navigate() {
    // Use the base URL from Playwright configuration
    await super.navigate(this.url);
  }

  async enterUsername(username) {
    await this.fill(this.selectors.usernameInput, username);
  }

  async enterPassword(password) {
    await this.fill(this.selectors.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.selectors.loginButton);
  }

  async getErrorMessage() {
    return await this.getText(this.selectors.errorMessage);
  }

  async isErrorMessageVisible() {
    return await this.isVisible(this.selectors.errorMessage);
  }

  async waitForLoginButton() {
    await this.waitForElement(this.selectors.loginButton);
  }
}

module.exports = SauceDemoLoginPage;
