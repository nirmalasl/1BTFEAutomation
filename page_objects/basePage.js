class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
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
}

module.exports = BasePage;