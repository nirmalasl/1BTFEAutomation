const Logger = require('../utils/Logger');
const ConfigUtil = require('../utils/ConfigUtil');

class BasePage {
  constructor(page) {
    this.page = page;
    Logger.debug('BasePage instance created');
  }

  async navigate(url) {
    try {
      const currentUrl = this.page.url();
      Logger.pageNavigation(url, currentUrl);

      const startTime = Date.now();
      await this.page.goto(url);
      const loadTime = Date.now() - startTime;

      Logger.performance('Page Load Time', loadTime, 'ms', url);
      Logger.pageAction('navigate', '', url, { load_time_ms: loadTime });
    } catch (error) {
      Logger.pageError('navigate', '', error, url);
      throw error;
    }
  }

  /**
     * Navigate to a path relative to the base URL
     * @param {string} path - Path to navigate to (e.g., '/inventory.html')
     */
  async navigateToPath(path = '') {
    const fullUrl = ConfigUtil.getUrl(path);
    await this.navigate(fullUrl);
  }

  /**
     * Navigate to the base URL
     */
  async navigateToBase() {
    const baseUrl = ConfigUtil.getBaseUrl();
    await this.navigate(baseUrl);
  }

  async fill(selector, value) {
    try {
      Logger.pageAction('fill', selector, '', { value: value });
      await this.page.locator(selector).fill(value);
      Logger.debug(`Successfully filled element ${selector} with value: ${value}`);
    } catch (error) {
      Logger.pageError('fill', selector, error);
      throw error;
    }
  }

  async click(selector) {
    try {
      Logger.pageAction('click', selector);
      await this.page.locator(selector).click();
      Logger.debug(`Successfully clicked element: ${selector}`);
    } catch (error) {
      Logger.pageError('click', selector, error);
      throw error;
    }
  }

  async waitForElement(selector, options = {}) {
    try {
      const timeout = options.timeout || 30000;
      const state = options.state || 'visible';

      Logger.pageWait(`element to be ${state}`, selector, timeout);

      const startTime = Date.now();
      await this.page.locator(selector).waitFor({ state, timeout });
      const waitTime = Date.now() - startTime;

      Logger.performance('Element Wait Time', waitTime, 'ms', selector);
      Logger.debug(`Element ${selector} is now ${state} (waited ${waitTime}ms)`);
    } catch (error) {
      Logger.pageError('waitForElement', selector, error);
      throw error;
    }
  }

  async getText(selector) {
    try {
      Logger.pageAction('getText', selector);
      const text = await this.page.locator(selector).textContent();
      Logger.debug(`Retrieved text from ${selector}: "${text}"`);
      return text;
    } catch (error) {
      Logger.pageError('getText', selector, error);
      throw error;
    }
  }

  async isVisible(selector) {
    try {
      Logger.pageAction('isVisible', selector);
      const isVisible = await this.page.locator(selector).isVisible();
      Logger.debug(`Element ${selector} visibility: ${isVisible}`);
      return isVisible;
    } catch (error) {
      Logger.pageError('isVisible', selector, error);
      throw error;
    }
  }

  async isEnabled(selector) {
    try {
      Logger.pageAction('isEnabled', selector);
      const isEnabled = await this.page.locator(selector).isEnabled();
      Logger.debug(`Element ${selector} enabled state: ${isEnabled}`);
      return isEnabled;
    } catch (error) {
      Logger.pageError('isEnabled', selector, error);
      throw error;
    }
  }

  async getAttribute(selector, attribute) {
    try {
      Logger.pageAction('getAttribute', selector, '', { attribute: attribute });
      const value = await this.page.locator(selector).getAttribute(attribute);
      Logger.debug(`Retrieved attribute "${attribute}" from ${selector}: "${value}"`);
      return value;
    } catch (error) {
      Logger.pageError('getAttribute', selector, error);
      throw error;
    }
  }

  async scrollToElement(selector) {
    try {
      Logger.pageAction('scrollToElement', selector);
      await this.page.locator(selector).scrollIntoViewIfNeeded();
      Logger.debug(`Scrolled to element: ${selector}`);
    } catch (error) {
      Logger.pageError('scrollToElement', selector, error);
      throw error;
    }
  }

  async hover(selector) {
    try {
      Logger.pageAction('hover', selector);
      await this.page.locator(selector).hover();
      Logger.debug(`Hovered over element: ${selector}`);
    } catch (error) {
      Logger.pageError('hover', selector, error);
      throw error;
    }
  }

  async selectOption(selector, option) {
    try {
      Logger.pageAction('selectOption', selector, '', { option: option });
      await this.page.locator(selector).selectOption(option);
      Logger.debug(`Selected option "${option}" in ${selector}`);
    } catch (error) {
      Logger.pageError('selectOption', selector, error);
      throw error;
    }
  }

  async takeScreenshot(name = 'screenshot') {
    try {
      const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
      const filename = `${name}_${timestamp}.png`;
      const screenshotPath = `reports/screenshots/${filename}`;

      await this.page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      Logger.screenshot(screenshotPath, name, 'manual');
      return screenshotPath;
    } catch (error) {
      Logger.error('Failed to take screenshot', error, { screenshot_name: name });
      throw error;
    }
  }

  async waitForPageLoad(timeout = 30000) {
    try {
      Logger.pageWait('page load complete', '', timeout);
      const startTime = Date.now();

      await this.page.waitForLoadState('networkidle', { timeout });

      const loadTime = Date.now() - startTime;
      Logger.performance('Page Load Complete Time', loadTime, 'ms', this.page.url());
    } catch (error) {
      Logger.pageError('waitForPageLoad', '', error);
      throw error;
    }
  }
}

module.exports = BasePage;
