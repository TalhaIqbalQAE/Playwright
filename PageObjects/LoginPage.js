const {expect} = require('@playwright/test');
class LoginPage
{
    constructor(page)
    {
        this.page = page;

        this.LoginEmailLocator = page.locator("//input[@id='userEmail']")
        this.LoginPasswordLocator = page.locator("//input[@id='userPassword']");
        this.LoginButtonLocator = page.locator("//input[@type='submit']");
    }

    async GotoURL()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(email, password)
    {
        await this.LoginEmailLocator.type(email);
        await this.LoginPasswordLocator.type(password);
        await this.LoginButtonLocator.click();

        //Wait for the network to return into the idle state
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};