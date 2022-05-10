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

test.only('Add to Cart Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await browser.newPage();

    //#region Locators
    const LoginEmailLocator = page.locator("//input[@id='userEmail']")
    const LoginPasswordLocator = page.locator("//input[@id='userPassword']");
    const LoginButtonLocator = page.locator("//input[@type='submit']");
    const CartButtonLocator = page.locator("[routerlink*='cart']");
    const CheckoutButtonLocator = page.locator("//*[text()='Checkout']");
    const DropdownCountryLocator = page.locator("//input[@placeholder='Select Country']");
    const DropdownCountryOptionsLocator = page.locator("//section[@class='ta-results list-group ng-star-inserted']");
    const CVVCodeLocator = page.locator("//div[@class='field small']//input[@class='input txt']");
    const NameonCardLocator = page.locator("//div[@class='field']//input[@class='input txt']");
    const PlaceOrderButtonLocator = page.locator("//div//a[@class='btnn action__submit ng-star-inserted']");
    const OrdersButtonLocator = page.locator("//button[@routerlink='/dashboard/myorders']");

    const OrderIDLocator = page.locator("//label[@class='ng-star-inserted']");

    const ProductLocator = page.locator("//div[@class='card-body']");
    
    const ProductName = "zara coat 3";
    //#endregion

    await page.goto("https://rahulshettyacademy.com/client");

    await LoginEmailLocator.type("dummyaccount@gmail.com");
    await LoginPasswordLocator.type("ABC123xyz");
    await LoginButtonLocator.click();
    

    //Wait for the network to return into the idle state
    await page.waitForLoadState('networkidle');

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    
    const productcount = await ProductLocator.count();

    for(let i = 0; i < productcount; i++)
    {
        if (await ProductLocator.nth(i).locator("b").textContent() === ProductName)
        {
            await ProductLocator.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await CartButtonLocator.click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    
    expect(bool).toBeTruthy();

    //Checkout
    await CheckoutButtonLocator.click();
    await DropdownCountryLocator.type("pa", {delay:1000});
    await DropdownCountryOptionsLocator.waitFor();
    const count = await DropdownCountryOptionsLocator.locator("button").count();

    for(let i = 0; i < count; i++)
    {
        const text = await DropdownCountryOptionsLocator.locator("button").nth(i).textContent();
        console.log(text);
        if (text === " Pakistan")
        {
            await DropdownCountryOptionsLocator.locator("button").nth(i).click();
            break;
        }
    }

    await CVVCodeLocator.type("123");
    await NameonCardLocator.type("ABC");
    await PlaceOrderButtonLocator.click();

    const OrderID = await OrderIDLocator.textContent();

    await OrdersButtonLocator.click();

    const ordersrows = await page.locator("//tbody//tr");

    await ordersrows.first().waitFor();

    const ordersrowscount = await ordersrows.count();

    for(let i = 0; i < ordersrowscount; i++)
    {
        const grabedorderID = await ordersrows.nth(i).locator("th").textContent();
        console.log(grabedorderID);
        if(OrderID.includes(grabedorderID))
        {
            await ordersrows.nth(i).locator("button").first().click();
            break;
        }
    }
    //Slight Pause
    await page.pause();
});
