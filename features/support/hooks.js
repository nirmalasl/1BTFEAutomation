const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const Logger = require('../../utils/Logger');

let browser;

BeforeAll(async () => {
    Logger.setup('Browser', 'Launching browser instance');
    browser = await chromium.launch({ headless: false });
    Logger.setup('Browser', 'Browser launched successfully');
    
    // Ensure screenshots directory exists
    const screenshotsDir = path.join(__dirname, '../../reports/screenshots');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
        Logger.setup('Screenshots', `Created screenshots directory: ${screenshotsDir}`);
    }
});

Before(async function () {
    const startTime = Date.now();
    
    Logger.browserAction('Creating new browser context');
    this.context = await browser.newContext();
    
    Logger.browserAction('Creating new page');
    this.page = await this.context.newPage();
    
    // Store start time for performance tracking
    this.scenarioStartTime = startTime;
    
    Logger.debug(`Browser context and page ready in ${Date.now() - startTime}ms`);
});

After(async function (scenario) {
    const scenarioName = scenario.pickle.name;
    const status = scenario.result.status;
    const duration = this.scenarioStartTime ? Date.now() - this.scenarioStartTime : null;
    
    Logger.testEnd(scenarioName, status, duration);
    
    // Take screenshot on failure
    if (status === 'FAILED') {
        const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
        const scenarioNameClean = scenarioName.replace(/[^a-zA-Z0-9]/g, '_');
        const screenshotPath = path.join(__dirname, '../../reports/screenshots', `FAILED_${scenarioNameClean}_${timestamp}.png`);
        
        try {
            await this.page.screenshot({ 
                path: screenshotPath, 
                fullPage: true 
            });
            
            Logger.screenshot(screenshotPath, scenarioName, 'test_failure');
            
            // Attach screenshot to the scenario
            this.attach(fs.readFileSync(screenshotPath), 'image/png');
        } catch (error) {
            Logger.error(`Failed to take screenshot for scenario: ${scenarioName}`, error);
        }
    }
    
    // Close browser context
    if (this.context) {
        Logger.browserAction('Closing browser context', { scenario: scenarioName });
        await this.context.close();
    }
});

AfterAll(async () => {
    if (browser) {
        Logger.teardown('Browser', 'Closing browser instance');
        await browser.close();
        Logger.teardown('Browser', 'Browser closed successfully');
    }
});