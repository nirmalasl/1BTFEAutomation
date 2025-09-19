const { logger, pageLogger, stepLogger } = require('../config/logger');

/**
 * Logger utility class providing consistent logging across the framework
 * This wrapper provides context-specific logging methods and formatting
 */
class Logger {

  /**
     * Main application logger methods
     */
  static info(message, meta = {}) {
    logger.info(message, meta);
  }

  static debug(message, meta = {}) {
    logger.debug(message, meta);
  }

  static warn(message, meta = {}) {
    logger.warn(message, meta);
  }

  static error(message, error = null, meta = {}) {
    if (error instanceof Error) {
      logger.error(message, {
        error: error.message,
        stack: error.stack,
        ...meta
      });
    } else {
      logger.error(message, meta);
    }
  }

  /**
     * Test execution specific logging
     */
  static testStart(scenarioName, feature = '') {
    const message = feature
      ? `Starting scenario: "${scenarioName}" in feature: "${feature}"`
      : `Starting scenario: "${scenarioName}"`;
    logger.info(message, { type: 'test_start', scenario: scenarioName, feature });
  }

  static testEnd(scenarioName, status, duration = null) {
    const message = `Scenario "${scenarioName}" ${status.toUpperCase()}`;
    const meta = {
      type: 'test_end',
      scenario: scenarioName,
      status: status.toLowerCase()
    };

    if (duration) {
      meta.duration_ms = duration;
    }

    if (status.toLowerCase() === 'passed') {
      logger.info(message, meta);
    } else {
      logger.error(message, meta);
    }
  }

  static testSkipped(scenarioName, reason = '') {
    logger.warn(`Scenario "${scenarioName}" SKIPPED${reason ? `: ${reason}` : ''}`, {
      type: 'test_skip',
      scenario: scenarioName,
      reason
    });
  }

  /**
     * Step definition specific logging
     */
  static stepStart(stepText, stepType = 'unknown') {
    stepLogger.info(`Executing ${stepType}: ${stepText}`, {
      step_text: stepText,
      step_type: stepType,
      type: 'step_start'
    });
  }

  static stepEnd(stepText, status = 'passed') {
    const message = `Step ${status.toUpperCase()}: ${stepText}`;
    if (status.toLowerCase() === 'passed') {
      stepLogger.info(message, { step_text: stepText, status, type: 'step_end' });
    } else {
      stepLogger.error(message, { step_text: stepText, status, type: 'step_end' });
    }
  }

  static stepError(stepText, error, additionalContext = {}) {
    stepLogger.error(`Step FAILED: ${stepText}`, {
      step_text: stepText,
      error: error.message,
      stack: error.stack,
      type: 'step_error',
      ...additionalContext
    });
  }

  /**
     * Page object specific logging
     */
  static pageAction(action, element = '', url = '', additionalInfo = {}) {
    const message = element
      ? `${action} on element: ${element}${url ? ` at ${url}` : ''}`
      : `${action}${url ? ` at ${url}` : ''}`;

    pageLogger.debug(message, {
      action: action,
      element: element,
      url: url,
      type: 'page_action',
      ...additionalInfo
    });
  }

  static pageNavigation(url, fromUrl = '') {
    const message = fromUrl
      ? `Navigating from ${fromUrl} to ${url}`
      : `Navigating to ${url}`;

    pageLogger.info(message, {
      to_url: url,
      from_url: fromUrl,
      type: 'navigation'
    });
  }

  static pageError(action, element, error, url = '') {
    pageLogger.error(`Failed to ${action}${element ? ` on ${element}` : ''}${url ? ` at ${url}` : ''}`, {
      action: action,
      element: element,
      url: url,
      error: error.message,
      stack: error.stack,
      type: 'page_error'
    });
  }

  static pageWait(waitType, selector = '', timeout = null) {
    const message = selector
      ? `Waiting for ${waitType}: ${selector}${timeout ? ` (timeout: ${timeout}ms)` : ''}`
      : `Waiting for ${waitType}${timeout ? ` (timeout: ${timeout}ms)` : ''}`;

    pageLogger.debug(message, {
      wait_type: waitType,
      selector: selector,
      timeout: timeout,
      type: 'page_wait'
    });
  }

  /**
     * Screenshot logging
     */
  static screenshot(path, scenario = '', reason = 'manual') {
    logger.info(`Screenshot captured: ${path}`, {
      screenshot_path: path,
      scenario: scenario,
      reason: reason,
      type: 'screenshot'
    });
  }

  /**
     * Data logging (for test data usage)
     */
  static dataUsage(dataType, dataKey, value = null) {
    const message = value
      ? `Using ${dataType} data - ${dataKey}: ${value}`
      : `Using ${dataType} data - ${dataKey}`;

    logger.debug(message, {
      data_type: dataType,
      data_key: dataKey,
      data_value: value,
      type: 'data_usage'
    });
  }

  /**
     * Browser/Context logging
     */
  static browserAction(action, details = {}) {
    logger.debug(`Browser action: ${action}`, {
      action: action,
      type: 'browser_action',
      ...details
    });
  }

  /**
     * Performance logging
     */
  static performance(metric, value, unit = 'ms', context = '') {
    logger.info(`Performance metric${context ? ` (${context})` : ''}: ${metric} = ${value}${unit}`, {
      metric: metric,
      value: value,
      unit: unit,
      context: context,
      type: 'performance'
    });
  }

  /**
     * Configuration/Setup logging
     */
  static setup(component, message, details = {}) {
    logger.info(`[SETUP] ${component}: ${message}`, {
      component: component,
      type: 'setup',
      ...details
    });
  }

  static teardown(component, message, details = {}) {
    logger.info(`[TEARDOWN] ${component}: ${message}`, {
      component: component,
      type: 'teardown',
      ...details
    });
  }
}

module.exports = Logger;
