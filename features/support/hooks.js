const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

let browser;

BeforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    
    // Ensure screenshots directory exists
    const screenshotsDir = path.join(__dirname, '../../reports/screenshots');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
    }
});

Before(async function () {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (scenario) {
    // Take screenshot on failure
    if (scenario.result.status === 'FAILED') {
        const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
        const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const screenshotPath = path.join(__dirname, '../../reports/screenshots', `FAILED_${scenarioName}_${timestamp}.png`);
        
        try {
            await this.page.screenshot({ 
                path: screenshotPath, 
                fullPage: true 
            });
            console.log(`Screenshot saved: ${screenshotPath}`);
            
            // Attach screenshot to the scenario
            this.attach(fs.readFileSync(screenshotPath), 'image/png');
        } catch (error) {
            console.log(`Failed to take screenshot: ${error.message}`);
        }
    }
    
    if (this.context) {
        await this.context.close();
    }
});

AfterAll(async () => {
    if (browser) {
        await browser.close();
    }
});