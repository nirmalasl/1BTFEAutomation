# 1BT Playwright BDD Automation Framework

>This project is a modern **AI-driven** test automation framework using **Cucumber** (BDD) and **Playwright** with the **Page Object Model (POM)** in JavaScript. It leverages AI tools like **GitHub Copilot**, **Claude Sonnet**, and **Playwright MCP** to automatically generate test artifacts from manual test cases, enabling scalable, maintainable, and readable frontend test automation.

---

## 🤖 AI-Driven Architecture Overview

This framework uses AI tools to automatically generate test automation code from manual test cases:

- **📝 Input**: Manual test cases and business requirements
- **🤖 AI Generation**: GitHub Copilot, Claude Sonnet, and Playwright MCP create test artifacts
- **📊 Output**: HTML reports, comprehensive logs, and screenshots

### Architecture Diagram



#### AI Tools Integration:

- **🤖 GitHub Copilot**: Generates step definitions, page object methods, and test logic
- **🧠 Claude Sonnet**: Creates feature files, Gherkin scenarios, and BDD structure  
- **🎭 Playwright MCP**: Generates page objects, element selectors, and UI interactions

#### Generated Test Assets:

- **🥒 Feature Files**: Gherkin scenarios with Given-When-Then structure
- **📝 Step Definitions**: JavaScript implementations of Cucumber steps
- **🏗️ Page Objects**: UI interaction classes with element locators

## 📦 Project Structure

- `features/` — Cucumber feature files and step definitions
	- `sauceDemoLogin.feature` — Authentication testing scenarios
	- `sauceDemoAddProduct.feature` — Product addition and cart testing scenarios
	- `step_definitions/` — Step implementations (JavaScript)
		- `sauceDemoLoginSteps.js` — Login and authentication steps
		- `sauceDemoAddProductSteps.js` — Product addition and cart management steps
	- `support/` — Hooks and custom world logic
- `page_objects/` — Page Object Model classes for UI abstraction
	- `basePage.js` — Base page with common functionality
	- `sauceDemoLoginPage.js` — Login page interactions
	- `sauceDemoInventoryPage.js` — Product inventory and cart management
	- `sauceDemoCartPage.js` — Shopping cart operations
	- `sauceDemoCheckoutPage.js` — Checkout information form
	- `sauceDemoCheckoutOverviewPage.js` — Order review and summary
	- `sauceDemoCheckoutCompletePage.js` — Order completion confirmation
- `test_data/` — Scenario data in JSON format
	- `testData.json` — User credentials, product data, and checkout information
- `config/` — Cucumber, reporting, and logging configuration
- `reports/` — Generated test reports (HTML, JSON)
- `logs/` — Application and test execution logs (auto-rotating)
- `utils/` — Utility classes and helpers (Logger, etc.)
- `docs/` — Documentation and guides
	- `ESLint_Integration_Guide.md` — ESLint setup and configuration guide
	- `Multi-Browser_Testing_Guide.md` — Cross-browser testing documentation
	- `Logging_Guide.md` — Comprehensive logging system guide
	- `Framework_Standards_Compliance_Report.md` — Code quality and standards report
	- `Simple_Architecture_Diagram.md` — Framework architecture overview
	- `AI_Framework_Architecture.drawio` — Visual architecture diagram
- `package.json` — Project dependencies and scripts

## 📚 Documentation

The framework includes comprehensive documentation in the `docs/` directory:

- **[ESLint Integration Guide](docs/ESLint_Integration_Guide.md)** — Complete guide for code quality setup
- **[Multi-Browser Testing Guide](docs/Multi-Browser_Testing_Guide.md)** — Cross-browser testing strategies
- **[Logging Guide](docs/Logging_Guide.md)** — Detailed logging system usage and configuration
- **[Framework Standards Report](docs/Framework_Standards_Compliance_Report.md)** — Quality metrics and compliance
- **[Architecture Overview](docs/Simple_Architecture_Diagram.md)** — Framework structure and design patterns

## 🚀 Getting Started

1. **Install dependencies:**
	 ```bash
	 npm install
	 ```
2. **Run all tests:**
	 ```bash
	 npm test
	
## 🧩 Key Patterns & Conventions

- **Page Objects:**
	- Each UI page/component has a class in `page_objects/`.
	- All selectors and UI logic are encapsulated in these classes.
	- Example: `sauceDemoLoginPage.js` exposes methods for login actions, `sauceDemoCartPage.js` handles cart operations.
- **Step Definitions:**
	- Organized by feature in `features/step_definitions/`.
	- Use async/await for all steps.
	- Reuse steps where possible across different features.
- **Test Data:**
	- Use `test_data/testData.json` for scenario-specific data.
	- Includes user credentials, product information, and checkout data.
	- Do **not** store credentials or secrets in the repo.
- **Hooks:**
	- Common setup/teardown logic in `features/support/hooks.js`.
- **Reporting:**
	- Custom reporting configured in `config/reporter.js`.
	- Reports output to `reports/cucumber-report.html`.
- **Logging:**
	- Comprehensive logging with Winston in `config/logger.js`.
	- Structured logs for tests, page actions, and system events.
	- Daily rotating logs in `logs/` directory.
	- See `docs/Logging_Guide.md` for detailed usage.

## ⚙️ Customization & Advanced Usage

- **Custom Cucumber config:** Edit `config/cucumber.js` for advanced options.
- **Add a new page:** Create a new file in `page_objects/` and expose UI methods.
- **Add a new test:** Create a `.feature` file in `features/` and implement steps in `step_definitions/`.

## 🛠️ Scripts

- `npm install` — Install dependencies
- `npx cucumber-js` — Run all tests
- `npm test` — Run all tests with HTML report generation
- `npm run test:report` — Run tests and generate HTML report
- `npm run test:login` — Run login feature tests only
- `npm run test:checkout` — Run checkout feature tests only
- `npm run test:parallel` — Run tests in parallel (4 workers)
- `npm run test:chrome` — Run tests in Chrome browser
- `npm run test:firefox` — Run tests in Firefox browser
- `npm run test:safari` — Run tests in Safari/WebKit browser
- `npm run test:edge` — Run tests in Edge browser
- `npm run test:all-browsers` — Run tests sequentially in all browsers
- `npm run test:all-browsers-parallel` — Run tests in all browsers in parallel
- `npm run test:headless` — Run tests in headless mode
- `npm run test:chrome-headless` — Run tests in Chrome headless mode
- `npm run report` — Generate HTML report from existing JSON results
- `npm run view-report` — Open the latest HTML report
- `npm run view-playwright-report` — Open Playwright test report
- `npm run clean-screenshots` — Clean screenshot directory
- `npm run clean-reports` — Clean Playwright report directories
- `npm run lint` — Run ESLint code analysis
- `npm run lint:fix` — Run ESLint and auto-fix issues
- `npm run lint:check` — Run ESLint with zero warnings tolerance

## 🧪 Test Features

This framework includes comprehensive test coverage for the Sauce Demo application:

### 🔐 Authentication Testing (`sauceDemoLogin.feature`)
- **Successful login** with valid credentials
- **Failed login** scenarios (invalid credentials, locked users)
- **Error message validation** for authentication failures

### 🛒 E-commerce Product Testing (`sauceDemoAddProduct.feature`)
- **Product Addition:**
  - Add single product to cart from inventory page
  - Cart badge validation and visibility
  - Product verification in cart
- **Complete Checkout Process:**
  - End-to-end checkout workflow from cart to completion
  - Checkout information validation (required fields)
  - Order review and confirmation on overview page
  - Success page validation with confirmation message
- **Navigation Flow:**
  - Seamless navigation between inventory → cart → checkout → completion
  - Multi-step form validation and progression
- **Data-Driven Testing:**
  - Configurable product selection from test data
  - Comprehensive product catalog integration

**Total Coverage:** Complete e-commerce workflow from login to order completion

## 📊 Features

### ✅ Comprehensive Logging
- **Multi-level logging** (DEBUG, INFO, WARN, ERROR)
- **Daily rotating log files** with automatic archival
- **Structured logging** for better analysis and debugging
- **Performance tracking** and metrics
- **Test execution tracing** with detailed step logging
- **Error tracking** with stack traces and context

### ✅ Advanced Reporting
- **HTML reports** with test results and screenshots
- **JSON reports** for CI/CD integration
- **Screenshot capture** on test failures
- **Custom reporting** with configurable options

### ✅ Code Quality & Standards
- **ESLint 9.x integration** with flat config format
- **Cucumber-specific linting rules** for step definitions and feature files
- **Playwright-specific linting rules** for browser automation code
- **Automated code formatting** and style enforcement
- **Zero-warnings policy** option for strict quality control
- **Pre-commit hooks** capability for continuous quality assurance

### ✅ Robust Test Architecture
- **Page Object Model** for maintainable UI interactions
- **BDD approach** with Cucumber and Gherkin syntax
- **Data-driven testing** with JSON test data
- **Cross-browser testing** capability with Playwright
- **Hooks and fixtures** for setup/teardown operations
- **ESLint integration** for code quality and consistency
- **Multi-browser support** (Chrome, Firefox, Safari/WebKit, Edge)
- **Parallel test execution** for faster feedback
- **Headless and headed modes** for different testing scenarios

## 🤝 Contributing

Pull requests and issues are welcome! Please follow project conventions and keep tests maintainable.

## 📝 Recent Updates

### v1.2.0 - September 2025
- ✅ **ESLint Integration** with modern flat config format (ESLint 9.x)
- ✅ **Multi-Browser Testing Support** (Chrome, Firefox, Safari/WebKit, Edge)
- ✅ **Parallel Test Execution** for improved performance
- ✅ **Enhanced npm Scripts** for comprehensive testing workflows
- ✅ **Code Quality Standards** with automated linting and formatting
- ✅ **Comprehensive Documentation** including ESLint and multi-browser guides
- ✅ **Headless/Headed Mode Support** for flexible testing environments
- ✅ **Advanced Reporting** with Playwright and Cucumber HTML reports
- ✅ **Cross-Platform Compatibility** with Windows PowerShell support

### v1.1.0 - September 2025
- ✅ **Added comprehensive product testing** with `sauceDemoAddProduct.feature`
- ✅ **Complete e-commerce workflow** from login to order completion
- ✅ **Enhanced page objects** for cart, checkout, and order management
- ✅ **Updated test data** with product catalog and checkout information
- ✅ **Improved logging system** with Winston and daily rotation
- ✅ **Structured test architecture** with better maintainability

---



