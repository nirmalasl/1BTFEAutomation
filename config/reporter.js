const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'hierarchy',  // Currently active
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  name: '1BT Frontend Automation Test Report',
  brandTitle: '1BT Frontend Automation',
  columnLayout: 1,
  storeScreenshots: true,
  noInlineScreenshots: false,
  screenshotsDirectory: 'reports/screenshots/',
  metadata: {
    'Project': '1BT Frontend Automation',
    'Team': 'QA Automation Team',
    'App Version': '1.0.0',
    'Test Environment': 'QA',
    'Browser': 'Chrome (Headless: false)',
    'Platform': 'Windows 11',
    'Test Suite': 'Login & Authentication Tests',
    'Framework': 'Cucumber BDD + Playwright + POM',
    'Execution Mode': 'Automated',
    'Report Generated': new Date().toLocaleString()
  }
};

reporter.generate(options);
