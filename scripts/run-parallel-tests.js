/**
 * Multi-Browser Parallel Test Runner
 * Runs Cucumber tests across different browsers in parallel
 */

const { spawn } = require('child_process');
const path = require('path');

const browsers = ['chromium', 'firefox', 'webkit', 'edge'];

// Color codes for console output
const colors = {
    chromium: '\x1b[32m', // Green
    firefox: '\x1b[31m',   // Red
    webkit: '\x1b[34m',    // Blue
    edge: '\x1b[36m',      // Cyan
    reset: '\x1b[0m'
};

function runTestsInBrowser(browser) {
    return new Promise((resolve, reject) => {
        console.log(`${colors[browser]}🚀 Starting tests in ${browser}${colors.reset}`);
        
        const env = { ...process.env, BROWSER: browser };
        
        // Handle Windows npm command properly
        let command, args;
        if (process.platform === 'win32') {
            command = 'cmd';
            args = ['/c', 'npm', 'run', 'test'];
        } else {
            command = 'npm';
            args = ['run', 'test'];
        }
        
        const testProcess = spawn(command, args, {
            env: env,
            stdio: ['ignore', 'pipe', 'pipe'],
            cwd: process.cwd(),
            shell: process.platform === 'win32'
        });
        
        let output = '';
        let errorOutput = '';
        
        testProcess.stdout.on('data', (data) => {
            const message = data.toString();
            output += message;
            // Prefix console output with browser name and color
            process.stdout.write(`${colors[browser]}[${browser.toUpperCase()}]${colors.reset} ${message}`);
        });
        
        testProcess.stderr.on('data', (data) => {
            const message = data.toString();
            errorOutput += message;
            process.stderr.write(`${colors[browser]}[${browser.toUpperCase()}] ERROR${colors.reset} ${message}`);
        });
        
        testProcess.on('close', (code) => {
            if (code === 0) {
                console.log(`${colors[browser]}✅ ${browser} tests completed successfully${colors.reset}`);
                resolve({ browser, success: true, output });
            } else {
                console.log(`${colors[browser]}❌ ${browser} tests failed with code ${code}${colors.reset}`);
                resolve({ browser, success: false, output, error: errorOutput, exitCode: code });
            }
        });
        
        testProcess.on('error', (error) => {
            console.error(`${colors[browser]}💥 Failed to start ${browser} tests:${colors.reset}`, error);
            reject({ browser, error });
        });
    });
}

async function runAllBrowsersInParallel() {
    console.log('🌐 Starting multi-browser parallel test execution...\n');
    
    const startTime = Date.now();
    
    try {
        const results = await Promise.all(
            browsers.map(browser => runTestsInBrowser(browser))
        );
        
        const duration = Date.now() - startTime;
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(2);
        
        console.log('\n📊 Test Results Summary:');
        console.log('========================');
        
        const successfulBrowsers = [];
        const failedBrowsers = [];
        
        results.forEach(result => {
            if (result.success) {
                successfulBrowsers.push(result.browser);
                console.log(`${colors[result.browser]}✅ ${result.browser}: PASSED${colors.reset}`);
            } else {
                failedBrowsers.push(result.browser);
                console.log(`${colors[result.browser]}❌ ${result.browser}: FAILED (exit code: ${result.exitCode})${colors.reset}`);
            }
        });
        
        console.log(`\n⏱️  Total execution time: ${minutes}m ${seconds}s`);
        console.log(`✅ Successful: ${successfulBrowsers.length}/${browsers.length} browsers`);
        console.log(`❌ Failed: ${failedBrowsers.length}/${browsers.length} browsers`);
        
        if (failedBrowsers.length > 0) {
            console.log(`\n❌ Failed browsers: ${failedBrowsers.join(', ')}`);
            process.exit(1);
        } else {
            console.log('\n🎉 All browser tests completed successfully!');
            process.exit(0);
        }
        
    } catch (error) {
        console.error('💥 Fatal error during parallel test execution:', error);
        process.exit(1);
    }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
    console.log('\n⚠️  Received SIGINT, terminating all browser tests...');
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('\n⚠️  Received SIGTERM, terminating all browser tests...');
    process.exit(1);
});

// Run the tests
if (require.main === module) {
    runAllBrowsersInParallel();
}

module.exports = { runAllBrowsersInParallel };