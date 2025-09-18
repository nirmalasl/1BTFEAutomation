/**
 * Playwright Configuration
 * Enables multi-browser parallel execution for Cucumber tests
 * Configured for Chrome, Firefox, Safari, and Edge browsers
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Global test directory (not used directly but good for reference)
  testDir: './features',
  
  // Timeout configurations
  timeout: 30000, // 30 seconds per test
  expect: {
    timeout: 5000 // 5 seconds for assertions
  },
  
  // Retry configuration
  retries: process.env.CI ? 2 : 1, // Retry failed tests
  
  // Parallel execution settings
  fullyParallel: true, // Run tests in parallel across workers
  workers: process.env.CI ? 2 : 4, // Number of parallel workers
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['json', { outputFile: 'reports/playwright-results.json' }],
    ['list'], // Console output
  ],
  
  // Global setup and teardown
  use: {
    // Base URL for your application
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    
    // Browser context options
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // Screenshots and videos
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    // Action timeout
    actionTimeout: 10000,
    
    // Navigation timeout
    navigationTimeout: 30000,
  },
  
  // Browser projects for parallel execution
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Channel can be 'chrome', 'chrome-beta', 'chrome-dev', 'chrome-canary'
        channel: 'chrome'
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'edge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge'
      },
    },
    
    // Mobile browsers (optional - uncomment if needed)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
  
  // Global setup file (optional)
  // globalSetup: require.resolve('./global-setup'),
  // globalTeardown: require.resolve('./global-teardown'),
  
  // Output directory for test artifacts
  outputDir: 'reports/test-results',
  
  // Web server configuration (if you need to start a local server)
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  //   timeout: 120 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // },
});