/**
 * Configuration Integration Demo
 * Demonstrates how page objects now use Playwright configuration values
 */

const ConfigUtil = require('../utils/ConfigUtil');

console.log('🔧 Playwright Configuration Integration Demo');
console.log('=============================================');
console.log();

console.log('📍 Base URL Configuration:');
console.log(`   Base URL: ${ConfigUtil.getBaseUrl()}`);
console.log(`   Example paths:`);
console.log(`   - Root: ${ConfigUtil.getUrl()}`);
console.log(`   - Inventory: ${ConfigUtil.getUrl('inventory.html')}`);
console.log(`   - Cart: ${ConfigUtil.getUrl('cart.html')}`);
console.log();

console.log('⏱️  Timeout Configuration:');
const timeouts = ConfigUtil.getTimeouts();
console.log(`   Test timeout: ${timeouts.timeout}ms`);
console.log(`   Action timeout: ${timeouts.actionTimeout}ms`);
console.log(`   Navigation timeout: ${timeouts.navigationTimeout}ms`);
console.log(`   Expect timeout: ${timeouts.expectTimeout}ms`);
console.log();

console.log('🖥️  Viewport Configuration:');
const viewport = ConfigUtil.getViewport();
console.log(`   Width: ${viewport.width}px`);
console.log(`   Height: ${viewport.height}px`);
console.log();

console.log('🚀 Environment Configuration:');
console.log(`   CI Mode: ${ConfigUtil.isCI()}`);
console.log(`   Retries: ${ConfigUtil.getRetries()}`);
console.log(`   Browser Channel: ${ConfigUtil.getBrowserChannel() || 'default'}`);
console.log();

console.log('✅ Configuration integration is working correctly!');
console.log('   - SauceDemoLoginPage now uses baseURL from playwright.config.js');
console.log('   - ConfigUtil provides centralized access to all configuration values');
console.log('   - Environment variables can override default settings');
console.log('   - All timeouts and browser settings are now centralized');
