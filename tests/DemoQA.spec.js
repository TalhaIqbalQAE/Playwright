const {test, expect} = require('@playwright/test');

test('Practice Form Test', async ({browser})=>
{
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();

    //#region Locators & FilePaths
    const firstnameLocator = page.locator("//input[@id='firstName']");
    const lastnameLocator = page.locator("//input[@id='lastName']");
    const useremailLocator = page.locator("//input[@id='userEmail']");
    const genderradiobuttonLocator = page.locator("//div[@class='custom-control custom-radio custom-control-inline']");
    const mobilenumberlocator = page.locator("//input[@id='userNumber']");
    const dateofbirthLocator = page.locator("//input[@id='dateOfBirthInput']");
    const subjectsLocator = page.locator("#subjectsContainer > div > div.subjects-auto-complete__value-container.subjects-auto-complete__value-container--is-multi.css-1hwfws3");
    const hobbiesLocator = page.locator("//div[@class='custom-control custom-checkbox custom-control-inline']");
    const currentaddressLocator = page.locator("#currentAddress");
    const dropdownLocatorstate =page.locator("//div[@class='col-md-4 col-sm-12']").first();
    const dropdownLocatorcity =page.locator("//div[@class='col-md-4 col-sm-12']").last();
    const submitbuttonlocator = page.locator("//div[@class='text-right col-md-2 col-sm-12']");

    const filepath = "./FileUploadTest/img.jpg";
    //#endregion

    //Open URL
    await page.goto("https://demoqa.com/automation-practice-form");
    
    //Filling the form
    await firstnameLocator.type("Talha");
    await lastnameLocator.type("TT");
    await useremailLocator.type("Talha@gmail.com");
    await genderradiobuttonLocator.first().click();
    await mobilenumberlocator.type("12345678909");
    await dateofbirthLocator.fill("11 May 2000");
    await page.press("//input[@id='dateOfBirthInput']", "Enter");
    await subjectsLocator.click();
    await subjectsLocator.type("Maths");
    await page.press(".subjects-auto-complete__value-container", "Enter");
    await subjectsLocator.type("Physics");
    await page.press(".subjects-auto-complete__value-container", "Enter");
    await hobbiesLocator.first().click();
    await page.setInputFiles("#uploadPicture", filepath);
    await currentaddressLocator.type("Address-Address typed")
    await dropdownLocatorstate.click();
    await dropdownLocatorstate.type("NCR");
    await page.press("//div[@class='col-md-4 col-sm-12']", "Enter");
    await dropdownLocatorcity.click();
    await dropdownLocatorcity.type("Delhi");
    await page.press("//div[@class='col-md-4 col-sm-12']", "Enter");
    await submitbuttonlocator.click();
    await page.waitForTimeout(2000);
});