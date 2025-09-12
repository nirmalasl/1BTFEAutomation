const { chromium } = require('playwright');  // Change from @playwright/test to playwright

class BasePage {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async navigate(url) {
        if (!this.browser) {
            this.browser = await chromium.launch({ headless: false });
            this.page = await this.browser.newPage();
        }
        await this.page.goto(url);
    }

    async fill(selector, value) {
        await this.page.locator(selector).fill(value);
    }

    async click(selector) {
        await this.page.locator(selector).click();
    }

    async waitForElement(selector) {
        await this.page.locator(selector).waitFor({ state: 'visible' });
    }

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.page = null;
        }
    }
}

module.exports = BasePage;