const {expect} = require('@playwright/test');
class CheckoutPage
{
    constructor(page)
    {
        this.page = page;

        this.DropdownCountryLocator = page.locator("//input[@placeholder='Select Country']");
        this.DropdownCountryOptionsLocator = page.locator("//section[@class='ta-results list-group ng-star-inserted']");
        this.CVVCodeLocator = page.locator("//div[@class='field small']//input[@class='input txt']");
        this.NameonCardLocator = page.locator("//div[@class='field']//input[@class='input txt']");
        this.PlaceOrderButtonLocator = page.locator("//div//a[@class='btnn action__submit ng-star-inserted']");

        this.OrdersButtonLocator = page.locator("//button[@routerlink='/dashboard/myorders']");

        this.OrderIDLocator = page.locator("//label[@class='ng-star-inserted']");
    }

    async fillCheckoutInfo()
    {
        await this.DropdownCountryLocator.type("pa", {delay:3000});
        await this.DropdownCountryOptionsLocator.waitFor();
        const count = await this.DropdownCountryOptionsLocator.locator("button").count();

        for(let i = 0; i < count; i++)
        {
            const text = await this.DropdownCountryOptionsLocator.locator("button").nth(i).textContent();
            console.log(text);
            if (text === " Pakistan")
            {
                await this.DropdownCountryOptionsLocator.locator("button").nth(i).click();
                break;
            }
        }

        await this.CVVCodeLocator.type("123");
        await this.NameonCardLocator.type("ABC");
        await this.PlaceOrderButtonLocator.click();
    }

    async getInfoFromOrderReceipt()
    {
        const OrderID = await this.OrderIDLocator.textContent();
        return OrderID;
    }

    async navigatetoOrdersPage()
    {
        await this.OrdersButtonLocator.click();
    }
}
module.exports = {CheckoutPage};