
const {test, expect} = require('@playwright/test');

test('Browser Playwright Test', async ({browser})=>
{
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //#region Locators
    const usernameLocator = page.locator('#username');
    const passwordLocator = page.locator("[type='password']");
    const signinButtonLocator = page.locator('#signInBtn');
    const incorrectCredentialsTextLocator = page.locator("[style*='block']");
    const productlocator = page.locator(".card-body a");
    const homePageTextLocator = page.locator("//div/a[@class = 'navbar-brand']");
    //#endregion
    
    //Open URL
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    //Login with Invalid Credentials
    await usernameLocator.type("Talha");
    await passwordLocator.type("abc123");
    await signinButtonLocator.click();

    //Verify incorrect credentials
    console.log(await incorrectCredentialsTextLocator.textContent());
    await expect(incorrectCredentialsTextLocator).toContainText('Incorrect');

    //Login with Valid Credentials
    await usernameLocator.fill("rahulshettyacademy");
    await passwordLocator.fill("learning");
    
    //Waits after the click action performs
    await Promise.all(
        [
            page.waitForNavigation(),
            await signinButtonLocator.click(),
        ]
    );

    //Verify user is loggedin
    console.log(await homePageTextLocator.textContent());
    await expect(homePageTextLocator).toContainText("ProtoCommerce Home");

    

    //Get the Product name
    // console.log(await productlocator.first().textContent());
    // console.log(await productlocator.nth(1).textContent());
    console.log(await productlocator.allTextContents());

    await page.waitForTimeout(3000);
});

test('Page Playwright Test', async ({page})=>
{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});

test('UI Controls', async ({page})=>
{
    const usernameLocator = page.locator('#username');
    const passwordLocator = page.locator("[type='password']");
    const signinButtonLocator = page.locator('#signInBtn');
    const dropdownLocator = page.locator("//select[@class='form-control']");
    const radioButtonLocator = page.locator("//span[@class='radiotextsty']");
    const popupButtonLocator = page.locator("//button[@id='okayBtn']");
    const checkboxLocator = page.locator("//input[@id='terms']");
    const documentLinkLocator = page.locator("//body/a[@class='blinkingText']");

    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    await usernameLocator.fill("rahulshettyacademy");
    await passwordLocator.fill("learning");

    await radioButtonLocator.last().click();
    await dropdownLocator.selectOption("consult");
    await popupButtonLocator.click();
    
    //Assertion for radio button
    await expect(radioButtonLocator.last()).toBeChecked();
    console.log(await radioButtonLocator.last().isChecked()); //True/False

    //Check the checkbox
    await checkboxLocator.click();

    //Assertion for checkbox
    await expect(checkboxLocator).toBeChecked();
    console.log(await checkboxLocator.isChecked()); //True/False

    //Uncheck the checkbox
    await checkboxLocator.uncheck();

    //Assertion for unchecking checkbox
    expect(await checkboxLocator.isChecked()).toBeFalsy(); //If returns false then correct

    //Document Link
    //Check if it is blinking
    //Do this by comparing the attribute value "blinkingText"
    //"blinkingText" is a class name which makes text blink
    await expect(documentLinkLocator).toHaveAttribute("class", "blinkingText");

    await page.pause();
});

test('New Window Test', async ({browser})=>
{
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const documentLinkLocator = page.locator("//body/a[@class='blinkingText']");

    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    //Document Link
    //Check if it is blinking
    //Do this by comparing the attribute value "blinkingText"
    //"blinkingText" is a class name which makes text blink
    await expect(documentLinkLocator).toHaveAttribute("class", "blinkingText");
    
    //Open Document link
    const [newpageobject] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLinkLocator.click(),
        ]
    );
    
    //Grabbing some text from new page
    const newpageTextLocator = newpageobject.locator("//div//h2//span/strong");
    console.log(await newpageTextLocator.textContent());

    await page.pause();
});

test.only('Spliting the text', async ({browser})=>
{
    //Browser Setup
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const documentLinkLocator = page.locator("//body/a[@class='blinkingText']");
    const usernameLocator = page.locator('#username');

    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    //Document Link
    //Check if it is blinking
    //Do this by comparing the attribute value "blinkingText"
    //"blinkingText" is a class name which makes text blink
    await expect(documentLinkLocator).toHaveAttribute("class", "blinkingText");
    
    //Open Document link
    const [newpageobject] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLinkLocator.click(),
        ]
    );
    
    //New Page locators
    const newpageTextLocator = newpageobject.locator("//div//h2//span/strong");
    const newpageEmailTextLocator = newpageobject.locator("/html/body/div/header/div[2]/div/div/div[1]/ul");
    
    //Grabbing some text from new page
    console.log(await newpageTextLocator.textContent());
        
    const text = await newpageTextLocator.textContent();
    const arrayText = text.split("&");
    await usernameLocator.type(arrayText[1]);

    //Pause
    await page.pause();
    
});

