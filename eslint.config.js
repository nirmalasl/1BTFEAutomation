/**
 * ESLint Configuration for Cucumber-Playwright Test Automation Framework
 * Using ESLint 9.x flat config format
 */

const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',

        // Cucumber globals
        Given: 'readonly',
        When: 'readonly',
        Then: 'readonly',
        Before: 'readonly',
        After: 'readonly',
        BeforeAll: 'readonly',
        AfterAll: 'readonly',
        setDefaultTimeout: 'readonly',
        setDefinitionFunctionWrapper: 'readonly',

        // Test framework globals
        expect: 'readonly'
      }
    },
    rules: {
      // Code Quality Rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': ['error', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }],
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-var': 'error',

      // Code Style Rules
      'indent': ['error', 2],
      'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-infix-ops': 'error',
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'max-len': ['warn', { 'code': 100, 'tabWidth': 2 }],

      // Function and Class Rules
      'func-call-spacing': ['error', 'never'],
      'space-before-blocks': 'error',
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

      // Async/Await Rules (important for test automation)
      'require-await': 'warn',
      'no-return-await': 'error'
    },
    ignores: [
      'node_modules/**',
      'reports/**',
      'logs/**',
      'coverage/**',
      'dist/**',
      'build/**',
      '**/*.feature',
      '**/*.html',
      '**/*.json',
      '**/*.md',
      '**/*.log',
      '.vscode/**',
      '.idea/**'
    ]
  },
  {
    // Configuration for Step Definition files
    files: ['features/step_definitions/**/*.js'],
    rules: {
      'no-unused-expressions': 'off', // Allow Cucumber step expressions
      'func-names': 'off' // Allow anonymous functions in step definitions
    }
  },
  {
    // Configuration for Page Object files
    files: ['page_objects/**/*.js'],
    rules: {
      'class-methods-use-this': 'off', // Page objects may have methods that don't use 'this'
      'no-await-in-loop': 'warn' // Sometimes necessary in UI automation
    }
  },
  {
    // Configuration for Playwright config files
    files: ['playwright.config.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly'
      }
    }
  },
  {
    // Configuration for Config and Utility files
    files: ['config/**/*.js', 'utils/**/*.js'],
    rules: {
      'no-process-env': 'off' // Allow process.env usage in config files
    }
  },
  {
    // Configuration for Demo and Script files (allow console statements)
    files: ['scripts/**/*.js'],
    rules: {
      'no-console': 'off', // Demo scripts can use console
      'max-len': ['warn', { 'code': 120 }] // Allow longer lines in scripts
    }
  }
];
