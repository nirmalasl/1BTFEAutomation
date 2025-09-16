# Logging in the Test Automation Framework

## Overview

This framework includes comprehensive logging capabilities using Winston logger to provide detailed insights into test execution, page interactions, and system behavior.

## Logging Architecture

### Core Components

1. **Logger Configuration** (`config/logger.js`)
   - Centralized logging configuration
   - Multiple log levels and transports
   - File rotation and archival
   - Specialized loggers for different components

2. **Logger Utility** (`utils/Logger.js`)
   - High-level wrapper for consistent logging
   - Context-specific logging methods
   - Structured log formatting

3. **Integration Points**
   - Hooks (test lifecycle logging)
   - Page Objects (UI interaction logging)
   - Step Definitions (test step logging)

## Log Levels

- **ERROR**: Critical errors and failures
- **WARN**: Warnings and unexpected conditions
- **INFO**: General information and test progress
- **DEBUG**: Detailed execution information

## Log Files

The framework generates several log files in the `logs/` directory:

### Daily Rotating Files

- **`application-YYYY-MM-DD.log`**: All application logs (debug level and above)
- **`error-YYYY-MM-DD.log`**: Error logs only
- **`test-execution-YYYY-MM-DD.log`**: Test execution logs (info level and above)
- **`page-actions-YYYY-MM-DD.log`**: Page object interaction logs
- **`step-definitions-YYYY-MM-DD.log`**: Step definition execution logs

### Special Files

- **`exceptions.log`**: Uncaught exceptions
- **`rejections.log`**: Unhandled promise rejections

## Log Rotation

- **Max File Size**: 20MB (10MB for specialized logs)
- **Retention**: 14 days for application logs, 30 days for error logs, 7 days for test logs
- **Daily Rotation**: New files created daily with date suffix

## Usage Examples

### In Step Definitions

```javascript
const Logger = require('../../utils/Logger');

When('I perform some action', async function () {
    Logger.stepStart('Perform some action', 'When');
    try {
        // Your test logic here
        Logger.stepEnd('Perform some action');
    } catch (error) {
        Logger.stepError('Perform some action', error);
        throw error;
    }
});
```

### In Page Objects

```javascript
const Logger = require('../utils/Logger');

class MyPage extends BasePage {
    async clickSubmit() {
        try {
            Logger.pageAction('click', 'submit button');
            await this.click(this.submitButton);
            Logger.debug('Successfully clicked submit button');
        } catch (error) {
            Logger.pageError('click', 'submit button', error);
            throw error;
        }
    }
}
```

### General Application Logging

```javascript
const Logger = require('./utils/Logger');

// Information logging
Logger.info('Test configuration loaded successfully');

// Error logging with context
Logger.error('Database connection failed', error, { 
    connection_string: 'masked',
    retry_count: 3 
});

// Performance logging
Logger.performance('API Response Time', 250, 'ms', '/api/users');
```

## Logger Methods

### General Methods

- `Logger.info(message, meta)` - Log informational messages
- `Logger.debug(message, meta)` - Log debug information
- `Logger.warn(message, meta)` - Log warnings
- `Logger.error(message, error, meta)` - Log errors with optional Error object

### Test-Specific Methods

- `Logger.testStart(scenarioName, feature)` - Log test scenario start
- `Logger.testEnd(scenarioName, status, duration)` - Log test completion
- `Logger.testSkipped(scenarioName, reason)` - Log skipped tests

### Step Definition Methods

- `Logger.stepStart(stepText, stepType)` - Log step execution start
- `Logger.stepEnd(stepText, status)` - Log step completion
- `Logger.stepError(stepText, error, context)` - Log step errors

### Page Object Methods

- `Logger.pageAction(action, element, url, info)` - Log page interactions
- `Logger.pageNavigation(url, fromUrl)` - Log navigation
- `Logger.pageError(action, element, error, url)` - Log page errors
- `Logger.pageWait(waitType, selector, timeout)` - Log waiting operations

### Utility Methods

- `Logger.screenshot(path, scenario, reason)` - Log screenshot capture
- `Logger.dataUsage(dataType, dataKey, value)` - Log test data usage
- `Logger.browserAction(action, details)` - Log browser operations
- `Logger.performance(metric, value, unit, context)` - Log performance metrics
- `Logger.setup(component, message, details)` - Log setup operations
- `Logger.teardown(component, message, details)` - Log teardown operations

## Configuration

### Environment Variables

You can control logging behavior with environment variables:

- `LOG_LEVEL`: Set the minimum log level (debug, info, warn, error)
- `CONSOLE_LOG_LEVEL`: Set console output level independently

### Example Usage

```bash
# Run tests with debug logging
set LOG_LEVEL=debug && npm test

# Run tests with minimal console output
set CONSOLE_LOG_LEVEL=error && npm test
```

## Log Format

Logs are formatted with the following structure:

```
[YYYY-MM-DD HH:mm:ss] LEVEL: message
Metadata: {
  "key": "value",
  "context": "additional info"
}
```

Console logs use a simplified format:
```
[HH:mm:ss] LEVEL: message
```

## Best Practices

1. **Use Appropriate Log Levels**
   - ERROR: Test failures, system errors
   - WARN: Unexpected conditions, deprecation warnings
   - INFO: Test progress, important milestones
   - DEBUG: Detailed execution flow, variable values

2. **Include Context**
   - Always provide meaningful metadata
   - Include relevant identifiers (scenario names, element selectors)
   - Add timing information for performance analysis

3. **Error Logging**
   - Always log errors with stack traces
   - Include relevant context that led to the error
   - Use structured metadata for easier analysis

4. **Performance Tracking**
   - Log page load times, API response times
   - Track test execution duration
   - Monitor resource usage

5. **Security Considerations**
   - Never log sensitive data (passwords, API keys)
   - Mask or redact sensitive information in logs
   - Use structured logging for easier filtering

## Troubleshooting

### Common Issues

1. **Log files not created**
   - Ensure the `logs/` directory exists and is writable
   - Check file permissions

2. **Logs not appearing in console**
   - Check `CONSOLE_LOG_LEVEL` environment variable
   - Verify log level configuration

3. **Large log files**
   - Log rotation should handle this automatically
   - Check disk space and retention settings

### Analysis Tools

- Use log analysis tools like ELK stack for production environments
- Grep commands for quick log analysis:
  ```bash
  # Find all errors in today's log
  grep "ERROR" logs/application-$(date +%Y-%m-%d).log
  
  # Find specific test scenario logs
  grep "scenario_name" logs/test-execution-$(date +%Y-%m-%d).log
  ```

## Integration with Reporting

Logs complement the existing HTML reports by providing:
- Detailed execution traces
- Performance metrics
- Error context and troubleshooting information
- Historical data for trend analysis

The logging system works alongside your existing `cucumber-report.html` to provide comprehensive visibility into test execution.