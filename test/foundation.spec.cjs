const { test, expect } = require("playwright/test");

test("initial", async ({page}) => {
    await page.goto("http://localhost:3000/");

    // Check the web title to identify if that is for testing.
    expect(await page.title()).toBe(
        "Animatable JS Test",
        "The test web did'n run successfully on the 3000 port."
    );
});

test("AnimationController", ({page}) => {
    // TODO: ...
});