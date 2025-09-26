# Copilot Instructions for AI Coding Agents

## Project Overview
This is an **AI-driven** Cucumber-based test automation framework using Playwright and the Page Object Model (POM) in JavaScript. The framework leverages AI tools (GitHub Copilot, Claude Sonnet, Playwright MCP) to auto-generate test artifacts from manual test cases, enabling scalable BDD frontend automation.

## Key Architecture
- `features/`: Feature files (`.feature`) and step definitions (`.js`)
  - `support/hooks.js`: Multi-browser setup, screenshot handling, context management
  - `step_definitions/`: Organized by feature (e.g., `sauceDemoLoginSteps.js`)
- `page_objects/`: POM classes extending `basePage.js` with comprehensive logging
- `config/`: Cucumber config, Winston logging, HTML reporting setup
- `utils/`: `ConfigUtil.js` (Playwright config access), `Logger.js` (Winston wrapper)
- `test_data/testData.json`: Structured JSON with users, products, checkout data
- `reports/`: Auto-generated HTML/JSON reports with embedded screenshots

## Developer Workflows
- **Run tests**: `npm test` (runs Cucumber + generates HTML report)
- **Multi-browser**: `npm run test:chrome/firefox/safari/edge` or `npm run test:all-browsers-parallel`
- **Environment control**: `BROWSER=firefox HEADLESS=true npm test`
- **Parallel execution**: `npm run test:parallel` (4 workers by default)
- **View reports**: `npm run view-report` (opens HTML report)
- **Linting**: `npm run lint` / `npm run lint:fix`

## Project-Specific Patterns
- **BasePage inheritance**: All page objects extend `basePage.js` which provides logging, navigation (`navigateToPath()`), and common actions
- **ConfigUtil integration**: Use `ConfigUtil.getBaseUrl()`, `ConfigUtil.getTimeouts()` instead of hardcoded values
- **Comprehensive logging**: Every action logs via `Logger.pageAction()`, `Logger.pageError()`, `Logger.performance()`
- **Environment-driven**: Browser selection via `process.env.BROWSER`, headless via `process.env.HEADLESS`
- **Cucumber world**: Page instances attached to `this` context in step definitions
- **Test data structure**: Access via `testData.sauceDemo.validUsers[0].username`

## Critical Conventions
- **Always use async/await** in steps, page methods, and hooks
- **Log all page interactions**: Use Logger methods, not console.log
- **Environment variables**: Support `BROWSER`, `HEADLESS`, `BASE_URL`, `CI`
- **Screenshots**: Auto-captured on failure, stored in `reports/screenshots/`
- **Step organization**: One file per feature, use descriptive constants for expected values
- **Page object methods**: Return data for assertions, handle errors with try/catch logging

## Integration Points
- **Cucumber + Playwright**: Hooks manage browser lifecycle, contexts shared via `this.page`
- **Winston logging**: Structured logs to `logs/` with daily rotation
- **HTML reporter**: Custom metadata, screenshot embedding via `config/reporter.js`
- **Multi-browser support**: Playwright browsers configured in `hooks.js` with channel options
- **Parallel execution**: Custom script `scripts/run-parallel-tests.js` for cross-browser parallel runs

## Examples
- **New page object**: Extend BasePage, use `Logger.pageAction()` for all interactions
- **New feature**: Create `.feature` + matching step definition file, import required page objects
- **Test data access**: `const testData = require('../test_data/testData.json')`
- **Browser selection**: Steps automatically inherit browser context from hooks
