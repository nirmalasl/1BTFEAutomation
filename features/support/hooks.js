const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');
const Logger = require('../../utils/Logger');

let browser;

// Get browser type from environment variable or default to chromium
const getBrowserType = () => {
  const browserName = process.env.BROWSER || 'chromium';
  Logger.debug(`Selected browser: ${browserName}`);

  switch (browserName.toLowerCase()) {
  case 'firefox':
    return firefox;
  case 'webkit':
  case 'safari':
    return webkit;
  case 'edge':
  case 'chromium':
  case 'chrome':
  default:
    return chromium;
  }
};

// Get browser launch options
const getBrowserOptions = () => {
  const browserName = process.env.BROWSER || 'chromium';
  const options = {
    headless: process.env.HEADLESS === 'true' || process.env.CI === 'true',
    slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0
  };

  // Add browser-specific options
  if (browserName === 'edge') {
    options.channel = 'msedge';
  } else if (browserName === 'chrome') {
    options.channel = 'chrome';
  }

  Logger.debug(`Browser options: ${JSON.stringify(options)}`);
  return options;
};

BeforeAll(async() => {
  const browserType = getBrowserType();
  const browserOptions = getBrowserOptions();
  const browserName = process.env.BROWSER || 'chromium';

  Logger.setup('Browser', `Launching ${browserName} browser instance`);
  browser = await browserType.launch(browserOptions);
  Logger.setup('Browser', `${browserName} browser launched successfully`);

  // Ensure screenshots directory exists
  const screenshotsDir = path.join(__dirname, '../../reports/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    Logger.setup('Screenshots', `Created screenshots directory: ${screenshotsDir}`);
  }
});

Before(async function() {
  const startTime = Date.now();

  Logger.browserAction('Creating new browser context');
  this.context = await browser.newContext();

  Logger.browserAction('Creating new page');
  this.page = await this.context.newPage();

  // Store start time for performance tracking
  this.scenarioStartTime = startTime;

  Logger.debug(`Browser context and page ready in ${Date.now() - startTime}ms`);
});

After(async function(scenario) {
  const scenarioName = scenario.pickle.name;
  const status = scenario.result.status;
  const duration = this.scenarioStartTime ? Date.now() - this.scenarioStartTime : null;
  const browserName = process.env.BROWSER || 'chromium';

  Logger.testEnd(scenarioName, status, duration);

  // Take screenshot on failure
  if (status === 'FAILED') {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
    const scenarioNameClean = scenarioName.replace(/[^a-zA-Z0-9]/g, '_');
    const screenshotPath = path.join(__dirname, '../../reports/screenshots', `FAILED_${browserName}_${scenarioNameClean}_${timestamp}.png`);

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
    Logger.browserAction('Closing browser context', { scenario: scenarioName, browser: browserName });
    await this.context.close();
  }
});

AfterAll(async() => {
  const browserName = process.env.BROWSER || 'chromium';
  if (browser) {
    Logger.teardown('Browser', `Closing ${browserName} browser instance`);
    await browser.close();
    Logger.teardown('Browser', `${browserName} browser closed successfully`);
  }
});
