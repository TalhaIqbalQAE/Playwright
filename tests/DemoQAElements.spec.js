const {test, expect} = require('@playwright/test');

test('text-box Test', async ({browser})=>
{
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
});

test('check-box Test', async ({browser})=>
{
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();

    //#region Locators
    const DropdownbuttonsLocator = page.locator("//button[@class='rct-collapse rct-collapse-btn']");
    const checkboxesLocator = page.locator("//span[@class='rct-checkbox']");
    const checkboxestextLocator = page.locator("//span[@class='rct-title']");
    //#endregion

    //Open URL
    await page.goto("https://demoqa.com/checkbox");

    //Open Dropdowns
    let numberofdropdowns = await DropdownbuttonsLocator.count();
    for(let i=0; i< numberofdropdowns; i++)
    {
        await DropdownbuttonsLocator.nth(i).click();
        numberofdropdowns = await DropdownbuttonsLocator.count();
    }

    let numberofcheckboxes = await checkboxesLocator.count();

    //console.log(await checkboxestextLocator.nth(0).textContent());
    for(let i=0; i< numberofcheckboxes; i++)
    {
        if(await checkboxestextLocator.nth(i).textContent() === "Documents")
        {
            await checkboxesLocator.nth(i).click();
            break;
        }
    }

    await page.pause();
});

test('radio-button Test', async ({browser})=>
{
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();

    //#region Locators
    const radioButtonLocator = page.locator("//div[@class='custom-control custom-radio custom-control-inline']");
    
    //#endregion

    //Open URL
    await page.goto("https://demoqa.com/radio-button");

    await radioButtonLocator.first().click();
});

test('web-tables Test', async ({browser})=>
{
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();

    //#region Locators
    const AddButtonLocator = page.locator("//button[@id='addNewRecordButton']");
    const firstnameLocator = page.locator("//input[@id='firstName']");
    const lastnameLocator = page.locator("//input[@id='lastName']");
    const useremailLocator = page.locator("//input[@id='userEmail']");
    const AgeLocator = page.locator("//input[@id='age']");
    const Salarylocator = page.locator("//input[@id='salary']");
    const DepartmentLocator = page.locator("//input[@id='department']");
    const SubmitButtonLocator = page.locator("//button[@id='submit']");

    //#endregion

    //Open URL
    await page.goto("https://demoqa.com/webtables");

    await AddButtonLocator.click();
    await firstnameLocator.type("talha");
    await lastnameLocator.type("talha");
    await useremailLocator.type("talha@gmail.com");
    await AgeLocator.type("11");
    await Salarylocator.type("555");
    await DepartmentLocator.type("Science");
    await SubmitButtonLocator.click();
});

test('buttons Test', async ({browser})=>
{
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();

    //#region Locators
    const DoubleclickButtonLocator = page.locator("//button[@id='doubleClickBtn']");
    const rightclickbuttonLocator = page.locator("//button[@id='rightClickBtn']");
    const singleclickLocator = page.locator("//div[@class='mt-4']//*[text()='Click Me']");

    //#endregion

    //Open URL
    await page.goto("https://demoqa.com/buttons");

    await DoubleclickButtonLocator.dblclick();
    
    await page.click("//button[@id='rightClickBtn']", { button: "right" });

    await singleclickLocator.click();
});

test.only('links Test', async ({browser})=>
{
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();

    //#region Locators
    const Link1NTLocator = page.locator("//a[@id='simpleLink']");
    const Link1APILocator = page.locator("//a[@id='created']");
    //#endregion

    //Open URL
    await page.goto("https://demoqa.com/links");

    // const [newpageobject] = await Promise.all(
    //     [
    //         context.waitForEvent('page'),
    //         Link1NTLocator.click(),
    //     ]
    // );
    // await expect(newpageobject).toHaveTitle("ToolsQA");


    await Link1APILocator.click();
    console.log(await page.locator("#linkResponse").textContent());
    await expect(page.locator("#linkResponse")).toContainText("201");
});
