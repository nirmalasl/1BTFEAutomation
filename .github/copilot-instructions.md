# Copilot Instructions for AI Coding Agents

## Project Overview
This is a Cucumber-based test automation framework using the Page Object Model (POM) in JavaScript. It is designed for BDD (Behavior-Driven Development) and automates frontend testing workflows.

## Key Structure
- `features/`: Cucumber feature files and step definitions.
  - `step_definitions/`: Step implementations (JS).
  - `support/`: Hooks and custom world logic.
- `page_objects/`: Page Object Model classes for UI abstraction.
- `test_data/`: Scenario data in JSON format.
- `config/`: Cucumber and reporting configuration.
- `reports/`: Generated test reports (HTML, JSON).

## Developer Workflows
- **Install dependencies:**
  ```
  npm install
  ```
- **Run all tests:**
  ```
  npx cucumber-js
  ```
- **Custom config:** Use `config/cucumber.js` for advanced Cucumber options.
- **Reports:** After test runs, see `reports/cucumber-report.html` for results.

## Project-Specific Patterns
- **Page Objects:** Each UI page/component has a class in `page_objects/` (e.g., `loginPage.js`). Use these in step definitions for all UI interactions.
- **Test Data:** Use `test_data/testData.json` for scenario-specific data. Reference this in your step definitions.
- **Hooks:** Common setup/teardown logic is in `features/support/hooks.js`.
- **Step Definitions:** Organize by feature in `features/step_definitions/`. Reuse steps where possible.

## Conventions
- Prefer async/await for all step and page object methods.
- Use descriptive scenario names in `.feature` files.
- Keep selectors and UI logic out of step definitions—encapsulate in page objects.
- Store all credentials and sensitive data outside the repo (not in `test_data/`).

## Integration Points
- **Cucumber:** Main test runner and BDD syntax.
- **Playwright (implied):** For browser automation (see `page_objects/`).
- **Custom reporting:** Configured in `config/reporter.js`.

## Examples
- To add a new page, create a file in `page_objects/` and expose methods for all UI actions.
- To add a new test, create a `.feature` file in `features/` and implement steps in `step_definitions/`.

---

For questions about project structure or workflows, see `README.md` or ask a maintainer.
