const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

let browser;

BeforeAll(async () => {
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

After(async function () {
    await this.context.close();
});

AfterAll(async () => {
    await browser.close();
});