const {test} = require('@playwright/test');

const data = require("../DataFiles/MultipleData.json");
let i = 0;
for(const vardata of data)
{   //`Reading multiple data from file and renameing the title by users full name ${vardata.fullname}`
    i++;
    test(`Test ${i}`, async ({browser})=>
    {
        //Browser Setup
        const context = await browser.newContext();
        const page = await context.newPage();

        //#region Locators
        const fullnameLocator = page.locator("//input[@id='userName']");
        const useremailLocator = page.locator("//input[@id='userEmail']");
        //#endregion

        //Open URL
        await page.goto("https://demoqa.com/text-box");

        await fullnameLocator.type(vardata.fullname);
        await useremailLocator.type(vardata.useremail);
        

        await page.close();
        await context.close();
    });
}