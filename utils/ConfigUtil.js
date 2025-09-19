/**
 * Playwright Configuration Utility
 * Provides access to Playwright configuration values for use in page objects
 */

const playwrightConfig = require('../playwright.config');

class ConfigUtil {
  /**
     * Get the base URL from Playwright configuration
     * @returns {string} The base URL
     */
  static getBaseUrl() {
    return playwrightConfig.use?.baseURL || process.env.BASE_URL || 'https://www.saucedemo.com';
  }

  /**
     * Get viewport settings from Playwright configuration
     * @returns {object} The viewport configuration
     */
  static getViewport() {
    return playwrightConfig.use?.viewport || { width: 1280, height: 720 };
  }

  /**
     * Get timeout settings from Playwright configuration
     * @returns {object} The timeout configurations
     */
  static getTimeouts() {
    return {
      timeout: playwrightConfig.timeout || 30000,
      actionTimeout: playwrightConfig.use?.actionTimeout || 10000,
      navigationTimeout: playwrightConfig.use?.navigationTimeout || 30000,
      expectTimeout: playwrightConfig.expect?.timeout || 5000
    };
  }

  /**
     * Check if running in CI environment
     * @returns {boolean} True if running in CI
     */
  static isCI() {
    return process.env.CI === 'true';
  }

  /**
     * Get the number of retry attempts
     * @returns {number} Number of retries
     */
  static getRetries() {
    return playwrightConfig.retries || (this.isCI() ? 2 : 1);
  }

  /**
     * Get browser-specific channel if configured
     * @returns {string|undefined} Browser channel
     */
  static getBrowserChannel() {
    const browser = process.env.BROWSER || 'chromium';
    if (browser === 'edge') return 'msedge';
    if (browser === 'chrome') return 'chrome';
    return undefined;
  }

  /**
     * Get full URL by appending path to base URL
     * @param {string} path - Path to append to base URL
     * @returns {string} Full URL
     */
  static getUrl(path = '') {
    const baseUrl = this.getBaseUrl();
    if (!path) return baseUrl;

    // Ensure baseUrl doesn't end with '/' and path doesn't start with '/'
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');

    return `${cleanBaseUrl}/${cleanPath}`;
  }
}

module.exports = ConfigUtil;
