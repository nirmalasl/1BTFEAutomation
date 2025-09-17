# 1BT Playwright BDD Automation Framework

>This project is a modern test automation framework using **Cucumber** (BDD) and **Playwright** with the **Page Object Model (POM)** in JavaScript. It enables scalable, maintainable, and readable frontend test automation for web applications.

---

## 🏗️ Architecture Diagram

```mermaid
graph TB
    subgraph "Test Execution Layer"
        CucumberJS[Cucumber.js Runner]
        Scripts[NPM Scripts<br/>test, test:login, test:checkout]
        Logger[Winston Logger<br/>Multi-level logging]
    end

    subgraph "BDD Layer"
        LoginFeature[sauceDemoLogin.feature<br/>Authentication Tests]
        CheckoutFeature[sauceDemoCheckout.feature<br/>E-commerce Tests]
        LoginSteps[sauceDemoSteps.js<br/>Login Step Definitions]
        CheckoutSteps[sauceDemoCheckoutSteps.js<br/>Checkout Step Definitions]
        Hooks[Hooks & Support<br/>hooks.js, world.js]
    end

    subgraph "Page Object Model Layer"
        BasePage[BasePage.js<br/>Common Functionality]
        LoginPage[sauceDemoLoginPage.js<br/>Login Actions]
        InventoryPage[sauceDemoInventoryPage.js<br/>Product & Cart Management]
        CartPage[sauceDemoCartPage.js<br/>Cart Operations]
        CheckoutPage[sauceDemoCheckoutPage.js<br/>Checkout Form]
        OverviewPage[sauceDemoCheckoutOverviewPage.js<br/>Order Review]
        CompletePage[sauceDemoCheckoutCompletePage.js<br/>Order Confirmation]
    end

    subgraph "Data & Configuration Layer"
        TestData[testData.json<br/>Users, Products, Checkout Info]
        Config[cucumber.js<br/>Test Configuration]
        LoggerConfig[logger.js<br/>Logging Configuration]
    end

    subgraph "Automation Engine"
        Playwright[Playwright<br/>Browser Automation Engine]
        Browser[Web Browser<br/>Chrome, Firefox, Safari, Edge]
    end

    subgraph "Reporting & Logging"
        Reporter[reporter.js<br/>Custom HTML Reporter]
        HTMLReport[cucumber-report.html<br/>Interactive Test Report]
        JSONReport[cucumber-report.json<br/>Machine Readable Report]
        LogFiles[Daily Rotating Logs<br/>application.log, error.log, etc.]
        Screenshots[Screenshots<br/>Failure Evidence]
    end

    subgraph "Target Application"
        SauceDemo[Sauce Demo Website<br/>E-commerce Test Application]
        LoginFlow[Authentication Flow]
        ShoppingFlow[Shopping & Checkout Flow]
    end

    %% Test Execution Connections
    Scripts --> CucumberJS
    Scripts --> Logger
    CucumberJS --> LoginFeature
    CucumberJS --> CheckoutFeature
    
    %% BDD Layer Connections
    LoginFeature --> LoginSteps
    CheckoutFeature --> CheckoutSteps
    LoginSteps --> Hooks
    CheckoutSteps --> Hooks
    
    %% Page Object Connections
    LoginSteps --> BasePage
    LoginSteps --> LoginPage
    LoginSteps --> InventoryPage
    CheckoutSteps --> BasePage
    CheckoutSteps --> InventoryPage
    CheckoutSteps --> CartPage
    CheckoutSteps --> CheckoutPage
    CheckoutSteps --> OverviewPage
    CheckoutSteps --> CompletePage
    
    %% Data Flow
    TestData --> LoginSteps
    TestData --> CheckoutSteps
    Config --> CucumberJS
    LoggerConfig --> Logger
    
    %% Automation Engine Connections
    BasePage --> Playwright
    LoginPage --> Playwright
    InventoryPage --> Playwright
    CartPage --> Playwright
    CheckoutPage --> Playwright
    OverviewPage --> Playwright
    CompletePage --> Playwright
    Hooks --> Playwright
    Playwright --> Browser
    
    %% Application Connections
    Browser --> SauceDemo
    Browser --> LoginFlow
    Browser --> ShoppingFlow
    
    %% Reporting Connections
    CucumberJS --> Reporter
    CucumberJS --> JSONReport
    Reporter --> HTMLReport
    Logger --> LogFiles
    Playwright --> Screenshots
    
    %% Styling
    classDef execution fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef bdd fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    classDef pom fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef data fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef automation fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef reporting fill:#e0f2f1,stroke:#00796b,stroke-width:2px
    classDef target fill:#fff8e1,stroke:#f9a825,stroke-width:2px

    class CucumberJS,Scripts,Logger execution
    class LoginFeature,CheckoutFeature,LoginSteps,CheckoutSteps,Hooks bdd
    class BasePage,LoginPage,InventoryPage,CartPage,CheckoutPage,OverviewPage,CompletePage pom
    class TestData,Config,LoggerConfig data
    class Playwright,Browser automation
    class Reporter,HTMLReport,JSONReport,LogFiles,Screenshots reporting
    class SauceDemo,LoginFlow,ShoppingFlow target
```

---
## 📦 Project Structure

- `features/` — Cucumber feature files and step definitions
	- `sauceDemoLogin.feature` — Authentication testing scenarios
	- `sauceDemoCheckout.feature` — E-commerce checkout testing scenarios
	- `step_definitions/` — Step implementations (JavaScript)
		- `sauceDemoSteps.js` — Login and authentication steps
		- `sauceDemoCheckoutSteps.js` — Checkout and cart management steps
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
- `package.json` — Project dependencies and scripts

## 🚀 Getting Started

1. **Install dependencies:**
	 ```bash
	 npm install
	 ```
2. **Run all tests:**
	 ```bash
	 npx cucumber-js
	 ```
3. **Run specific feature tests:**
	 ```bash
	 # Login tests only
	 npx cucumber-js features/sauceDemoLogin.feature
	 
	 # Checkout tests only
	 npx cucumber-js features/sauceDemoCheckout.feature
	 
	 # Run specific scenario
	 npx cucumber-js --name="Complete full checkout process"
	 ```
4. **Generate HTML report:**
	 ```bash
	 npm run test:report
	 # View the report at reports/cucumber-report.html
	 ```

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
- `npm run test:report` — Run tests and generate HTML report
- `npm run test:login` — Run login feature tests only
- `npm run test:checkout` — Run checkout feature tests only
- `npm run view-report` — Open the latest HTML report
- `npm run clean-screenshots` — Clean screenshot directory

## 🧪 Test Features

This framework includes comprehensive test coverage for the Sauce Demo application:

### 🔐 Authentication Testing (`sauceDemoLogin.feature`)
- **Successful login** with valid credentials
- **Failed login** scenarios (invalid credentials, locked users)
- **Error message validation** for authentication failures

### 🛒 E-commerce Checkout Testing (`sauceDemoCheckout.feature`)
- **Cart Management:**
  - Add single/multiple products to cart
  - Remove products from cart
  - Cart badge validation and visibility
  - View cart details and navigate between pages
- **Checkout Process:**
  - Complete end-to-end checkout workflow
  - Checkout information validation (required fields)
  - Order review and confirmation
  - Success page validation
- **Navigation Flow:**
  - Continue shopping from cart
  - Cancel checkout at different stages
- **Data-Driven Testing:**
  - Scenario outlines for testing multiple product types
  - Comprehensive product catalog coverage

**Total Coverage:** 19+ scenarios, 112+ test steps

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

### ✅ Robust Test Architecture
- **Page Object Model** for maintainable UI interactions
- **BDD approach** with Cucumber and Gherkin syntax
- **Data-driven testing** with JSON test data
- **Cross-browser testing** capability with Playwright
- **Hooks and fixtures** for setup/teardown operations

## 🤝 Contributing

Pull requests and issues are welcome! Please follow project conventions and keep tests maintainable.

## 📝 Recent Updates

### v1.1.0 - September 2025
- ✅ **Added comprehensive checkout testing** with `sauceDemoCheckout.feature`
- ✅ **16 new test scenarios** covering complete e-commerce workflow
- ✅ **4 new page objects** for cart, checkout, and order management
- ✅ **Enhanced inventory page** with cart functionality
- ✅ **Updated test data** with product catalog and checkout information
- ✅ **Added npm script** for running checkout tests independently (`npm run test:checkout`)
- ✅ **Expanded documentation** with detailed feature coverage

---



