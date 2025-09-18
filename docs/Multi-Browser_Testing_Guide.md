# Multi-Browser Parallel Testing Guide

This document explains how to use the Playwright configuration for running tests across different browsers in parallel.

## Overview

The project now supports running Cucumber tests across multiple browsers (Chrome, Firefox, Safari/WebKit, and Edge) both sequentially and in parallel. This is achieved through:

- `playwright.config.js` - Playwright configuration with multi-browser support
- Updated `features/support/hooks.js` - Enhanced browser initialization
- `scripts/run-parallel-tests.js` - Custom parallel execution script
- Enhanced npm scripts for browser-specific testing
- **NEW**: `utils/ConfigUtil.js` - Centralized configuration management
- **NEW**: Enhanced page objects using Playwright configuration values

## Configuration Integration

Page objects now automatically use configuration values from `playwright.config.js`:

### Base URL Management
```javascript
// Before: Hardcoded URLs in page objects
this.url = 'https://www.saucedemo.com/';

// After: Dynamic URL from Playwright configuration
this.url = ConfigUtil.getBaseUrl(); // Uses playwright.config.js baseURL
```

### Available Configuration Methods
```javascript
const ConfigUtil = require('../utils/ConfigUtil');

// Get base URL (from playwright.config.js or environment)
const baseUrl = ConfigUtil.getBaseUrl();

// Get full URLs with paths
const inventoryUrl = ConfigUtil.getUrl('inventory.html');

// Get timeout settings
const timeouts = ConfigUtil.getTimeouts();

// Get viewport settings
const viewport = ConfigUtil.getViewport();
```

## Configuration Integration Benefits

1. **Centralized Configuration**: All settings managed in one place (`playwright.config.js`)
2. **Environment Flexibility**: Easy switching between environments via `BASE_URL`
3. **Consistent Timeouts**: All pages use the same timeout configurations
4. **No Hardcoded URLs**: Page objects dynamically adapt to configuration changes
5. **CI/CD Ready**: Automatic configuration adjustment for CI environments
6. **Easy Debugging**: Quick environment switching without code changes

### Configuration Demo
Run the configuration demo to see all current settings:
```bash
node scripts/config-demo.js
```

## Browser Support

| Browser | Environment Variable | NPM Script |
|---------|---------------------|------------|
| Chrome  | `BROWSER=chromium` | `npm run test:chrome` |
| Firefox | `BROWSER=firefox` | `npm run test:firefox` |
| Safari  | `BROWSER=webkit` | `npm run test:safari` |
| Edge    | `BROWSER=edge` | `npm run test:edge` |

## Available Commands

### Single Browser Testing
```bash
# Run tests in specific browsers
npm run test:chrome          # Chrome browser
npm run test:firefox         # Firefox browser  
npm run test:safari          # Safari/WebKit browser
npm run test:edge           # Edge browser

# Run tests in headless mode
npm run test:headless        # Default browser (Chrome) in headless mode
npm run test:chrome-headless # Chrome in headless mode
```

### Multi-Browser Testing
```bash
# Run tests in all browsers sequentially
npm run test:all-browsers

# Run tests in all browsers in parallel (RECOMMENDED)
npm run test:all-browsers-parallel
```

### Environment Variables

You can customize test execution using these environment variables:

```bash
# Browser selection
BROWSER=firefox npm run test

# Base URL override
BASE_URL=https://staging.saucedemo.com npm run test

# Headless mode
HEADLESS=true npm run test

# Slow motion (for debugging)
SLOW_MO=100 npm run test

# Combination example
BROWSER=firefox BASE_URL=https://staging.saucedemo.com HEADLESS=true npm run test
```

## Playwright Configuration Features

The `playwright.config.js` includes:

- **Parallel Execution**: Tests run in parallel across multiple workers
- **Browser Support**: Chrome, Firefox, Safari, and Edge
- **Retry Logic**: Automatic retry on test failures
- **Screenshots**: Automatic screenshots on test failures
- **Video Recording**: Video capture for failed tests
- **Trace Files**: Detailed execution traces for debugging
- **Custom Timeouts**: Optimized timeout settings
- **Report Generation**: HTML and JSON reports

## Configuration Options

### Parallel Workers
```javascript
workers: process.env.CI ? 2 : 4  // 2 workers in CI, 4 locally
```

### Browser Projects
Each browser runs as a separate project with specific configurations:
```javascript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  { name: 'edge', use: { ...devices['Desktop Edge'] } }
]
```

## Parallel Test Execution

The custom parallel runner (`scripts/run-parallel-tests.js`) provides:

- **Colored Output**: Different colors for each browser's output
- **Progress Tracking**: Real-time status updates
- **Execution Summary**: Detailed results summary
- **Error Handling**: Graceful handling of test failures
- **Time Tracking**: Total execution time reporting

### Example Output
```
🚀 Starting tests in chromium
🚀 Starting tests in firefox  
🚀 Starting tests in webkit
🚀 Starting tests in edge

[CHROMIUM] Running tests...
[FIREFOX] Running tests...
[WEBKIT] Running tests...
[EDGE] Running tests...

✅ chromium tests completed successfully
✅ firefox tests completed successfully  
✅ webkit tests completed successfully
✅ edge tests completed successfully

📊 Test Results Summary:
========================
✅ chromium: PASSED
✅ firefox: PASSED
✅ webkit: PASSED  
✅ edge: PASSED

⏱️  Total execution time: 2m 34.56s
✅ Successful: 4/4 browsers
❌ Failed: 0/4 browsers

🎉 All browser tests completed successfully!
```

## Screenshots and Reports

### Screenshots
- Failed test screenshots are saved in `reports/screenshots/`
- Screenshot naming includes browser name: `FAILED_firefox_Login_Test_2025-09-18T10-30-45.png`

### Reports
- **Cucumber Reports**: `reports/cucumber-report.html`
- **Playwright Reports**: `reports/playwright-report/`
- **JSON Data**: `reports/cucumber-report.json`

View reports using:
```bash
npm run view-report           # Cucumber HTML report
npm run view-playwright-report  # Playwright HTML report
```

## Best Practices

1. **Use Parallel Execution**: For faster feedback, use `npm run test:all-browsers-parallel`

2. **Headless for CI**: Set `HEADLESS=true` in CI environments

3. **Browser-Specific Debugging**: Run individual browsers for debugging specific issues

4. **Clean Reports**: Use `npm run clean-reports` to clear old reports

5. **Environment Variables**: Use environment variables for consistent configuration

## Troubleshooting

### Common Issues

1. **Browser Not Found**
   ```bash
   npx playwright install
   ```

2. **Permission Errors on Windows**
   - Run PowerShell as Administrator
   - Or use `npm run clean-screenshots` instead of manual deletion

3. **Parallel Execution Failures**
   - Reduce worker count in `playwright.config.js`
   - Check system resources (RAM, CPU)

4. **WebKit/Safari Issues on Windows**
   - WebKit support is limited on Windows
   - Consider excluding WebKit in Windows environments

### Debugging Tips

1. **Enable Slow Motion**:
   ```bash
   SLOW_MO=500 BROWSER=chrome npm run test
   ```

2. **Run Single Browser**:
   ```bash
   npm run test:chrome
   ```

3. **Check Logs**:
   - Browser logs: `logs/`
   - Screenshots: `reports/screenshots/`
   - Detailed reports: `reports/playwright-report/`

## Integration with CI/CD

For CI/CD integration, use:
```bash
# Install browsers in CI
npx playwright install

# Run tests in headless mode with retries
HEADLESS=true npm run test:all-browsers-parallel
```

Add to your CI configuration:
```yaml
- name: Install Playwright Browsers
  run: npx playwright install

- name: Run Multi-Browser Tests  
  run: HEADLESS=true npm run test:all-browsers-parallel
  env:
    CI: true
```

This setup ensures efficient, reliable cross-browser testing with comprehensive reporting and debugging capabilities.