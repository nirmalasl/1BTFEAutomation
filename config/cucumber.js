/**
 * Cucumber Configuration
 * Defines test execution settings, paths, and reporting options
 */
module.exports = {
  default: {
    // Tag expression for filtering scenarios
    tags: '',

    // Formatting options for generated code snippets
    formatOptions: {
      snippetInterface: 'async-await'
    },

    // Feature file paths in execution order
    paths: [
      'features/sauceDemoLogin.feature',
      'features/sauceDemoAddProduct.feature'
    ],

    // Required files for step definitions and support code
    require: [
      'features/step_definitions/*.js',
      'features/support/*.js'
    ],

    // Output formats for test results
    format: [
      'progress-bar',
      ['html', 'reports/cucumber-report.html'],
      ['json', 'reports/cucumber-report.json']
    ],

    // Execution order: defined (respects paths array order)
    order: 'defined'
  }
};
