const {test} = require('@playwright/test');

console.log("Run Me");

test('text-box Test', async ({browser})=>
{
    console.log("Run Me 1");
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();

    //#region Locators
    const fullnameLocator = page.locator("//input[@id='userName']");
    const useremailLocator = page.locator("//input[@id='userEmail']");
    const currentaddressLocator = page.locator("//textarea[@id='currentAddress']");
    const PermanentaddressLocator = page.locator("//textarea[@id='permanentAddress']");
    const submitbuttonLocator = page.locator("//button[@id='submit']");
    //#endregion

    //Open URL
    await page.goto("https://demoqa.com/text-box");

    await fullnameLocator.type("Talha");
    await useremailLocator.type("Talha@gmail.com");
    await currentaddressLocator.type("Address - Address");
    await PermanentaddressLocator.type("Perm Address - Address");
    await submitbuttonLocator.click();

    await page.close();
    console.log("Run Me 2");
});
console.log("Run Me 3");