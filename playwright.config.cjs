const { devices } = require("playwright/test");

/**
 * This constant values that is defining related options about `playwright`.
 * See Also, test only critical situations that must be passed because, 
 * I thought about that we need to simplify a development processes.
 * 
 * And the a result is JSON because, We may be situations
 * to analyze JSON about a related test result, all right?
 * 
 * @type {import("playwright/test").PlaywrightTestConfig}
 */
const config = {
    testDir: "./test",
    timeout: 10 * 1000, // 10s
    expect: { timeout: 1000 /** 1s */ },
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    projects: [
        {name: "chromium", use: {...devices["Desktop Chrome"]}}
    ]
}

module.exports = config;