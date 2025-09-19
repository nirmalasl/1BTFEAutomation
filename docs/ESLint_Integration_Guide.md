# ESLint Integration Guide

This document explains how ESLint has been integrated into the Cucumber-Playwright test automation framework and how to use it effectively.

## Overview

ESLint is now integrated into the project to enforce consistent code quality and style across all JavaScript files. The configuration is tailored specifically for a Cucumber-Playwright testing environment.

## Configuration Files

- **`eslint.config.js`** - Main ESLint configuration using the new flat config format (ESLint 9.x)
- **`package.json`** - Contains ESLint scripts for easy execution

## Available Scripts

The following npm scripts are available for linting:

```bash
# Run ESLint on all files
npm run lint

# Run ESLint and automatically fix issues where possible
npm run lint:fix

# Run ESLint with strict checking (no warnings allowed)
npm run lint:check
```

## ESLint Rules Configuration

The configuration includes rules specifically tailored for test automation:

### Core Rules
- **Code Quality**: Prevents common errors and enforces best practices
- **Code Style**: Enforces consistent formatting (2-space indentation, single quotes, semicolons)
- **Async/Await**: Special handling for test automation patterns
- **Unused Variables**: Allows underscore prefix for intentionally unused parameters

### File-Specific Rules

#### Step Definition Files (`features/step_definitions/**/*.js`)
- Allows Cucumber step expressions without "unused expression" warnings
- Permits anonymous functions in step definitions

#### Page Object Files (`page_objects/**/*.js`)
- Allows methods that don't use `this` (common in page objects)
- Warns (but doesn't error) on await in loops (sometimes necessary in UI automation)

#### Config Files (`config/**/*.js`, `utils/**/*.js`)
- Allows `process.env` usage
- Permits Node.js-specific global variables

#### Script Files (`scripts/**/*.js`)
- Allows `console.log` statements (expected in demo/utility scripts)
- More lenient line length limits (120 characters)

#### Playwright Config (`playwright.config.js`)
- Special globals for Playwright configuration requirements

## Ignored Files and Directories

The following are automatically ignored by ESLint:
- `node_modules/`
- `reports/`
- `logs/`
- `coverage/`
- `dist/`
- `build/`
- `**/*.feature` (Gherkin files)
- `**/*.html`
- `**/*.json`
- `**/*.md`
- `**/*.log`
- `.vscode/`
- `.idea/`

## Integration with Development Workflow

### Pre-commit Checks
Consider adding ESLint to your pre-commit hooks:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint:check"
    }
  }
}
```

### IDE Integration
Most modern IDEs (VS Code, IntelliJ, etc.) support ESLint integration:

- Install the ESLint extension for your IDE
- Ensure the extension uses the project's `eslint.config.js`
- Enable "fix on save" for automatic formatting

### CI/CD Integration
Add linting to your CI/CD pipeline:

```yaml
# Example GitHub Actions step
- name: Run ESLint
  run: npm run lint:check
```

## Common Issues and Solutions

### 1. Unused Variables in Catch Blocks
**Issue**: `'error' is defined but never used`

**Solution**: Prefix with underscore or use the variable:
```javascript
try {
  // some code
} catch (_error) {
  // Handle error without using the variable
}
```

### 2. Await in Loops
**Warning**: `Unexpected await inside a loop`

**Explanation**: This is a warning, not an error. In UI automation, sequential execution is sometimes necessary. Consider if parallel execution is possible:

```javascript
// Sequential (sometimes necessary)
for (const item of items) {
  await page.click(item);
}

// Parallel (preferred when possible)
await Promise.all(items.map(item => page.click(item)));
```

### 3. Redundant Return Await
**Error**: `Redundant use of await on a return value`

**Solution**: Remove await from return statements:
```javascript
// Before
return await someAsyncFunction();

// After
return someAsyncFunction();
```

### 4. Line Length Warnings
**Warning**: Line length exceeds maximum

**Solutions**:
- Break long lines into multiple lines
- Use destructuring for long parameter lists
- Consider refactoring complex expressions

## Customization

To modify ESLint rules for your specific needs:

1. Edit `eslint.config.js`
2. Add or modify rules in the appropriate configuration block
3. Test changes with `npm run lint`
4. Update this documentation

## Best Practices

1. **Run linting frequently** during development
2. **Fix auto-fixable issues** first with `npm run lint:fix`
3. **Address remaining issues** manually
4. **Don't disable rules** without good reason
5. **Keep configuration up-to-date** as the project evolves

## Troubleshooting

### ESLint Version Issues
This project uses ESLint 9.x with flat config format. If you encounter issues:

1. Ensure you're using ESLint 9.x or later
2. Use `eslint.config.js` (not `.eslintrc.*`)
3. Check that all plugins are compatible with ESLint 9.x

### Performance Issues
If linting is slow:

1. Check that ignored patterns are working correctly
2. Consider running ESLint on specific directories
3. Use `--cache` flag for repeated runs

### Configuration Conflicts
If you have conflicting configurations:

1. Remove old `.eslintrc.*` files
2. Ensure only `eslint.config.js` exists
3. Clear ESLint cache: `npx eslint --cache --cache-location .eslintcache`

## Support

For ESLint-specific issues:
- [ESLint Documentation](https://eslint.org/docs/)
- [ESLint Rules Reference](https://eslint.org/docs/rules/)
- [ESLint Configuration Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)

For project-specific ESLint configuration questions, refer to the team's coding standards or create an issue in the project repository.