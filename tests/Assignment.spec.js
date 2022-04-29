const {test, expect} = require('@playwright/test');

test('Automatation', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await browser.newPage();

    //#region Locators
    const FullNameLocator = page.locator("//input[@id='user_name']");
    const EmailLocator = page.locator("//input[@id='user_email']");
    const PasswordLocator = page.locator("//input[@id='password']");
    const CheckboxLocator = page.locator("//input[@type='checkbox']");
    const SignupButtonLocator = page.locator("//input[@type='submit']");
    const SignupfailTextLocator = page.locator("//div[@class='bodySmall m-b-3-xs text-center-xs auth-flash-error']");

    const LoginEmailLocator = page.locator("//input[@id='email']")
    const LoginPasswordLocator = page.locator("//input[@id='password']");
    const LoginButtonLocator = page.locator("//input[@type='submit']");

    const ProductLocator = page.locator("//div[@class='course-listing-title']");
    //#endregion

    await page.goto("https://sso.teachable.com/secure/9521/identity/sign_up/email");

    await FullNameLocator.type("Dummy Account");
    await EmailLocator.type("DummyAccount@gmail.com");
    await PasswordLocator.type("DummyAccount");
    await CheckboxLocator.click();
    await SignupButtonLocator.click();

    await expect(SignupfailTextLocator).toContainText('Email is already in use');

    await page.goto("https://sso.teachable.com/secure/9521/identity/login");
    await LoginEmailLocator.type("DummyAccount@gmail.com");
    await LoginPasswordLocator.type("DummyAccount");
    await LoginButtonLocator.click();

    //Wait for the network to return into the idle state
    await page.waitForLoadState('networkidle');
    console.log(await ProductLocator.allTextContents());

    //Slight Pause
    await page.waitForTimeout(4000);
});