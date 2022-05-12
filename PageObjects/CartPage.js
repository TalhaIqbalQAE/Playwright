const {expect} = require('@playwright/test');
class CartPage
{
    constructor(page)
    {
        this.page = page;

        this.ListofProductsLocator = this.page.locator("div li").first();
        
        this.CheckoutButtonLocator = page.locator("//*[text()='Checkout']");
    }

    async checkforProductAvailability(ProductName)
    {
        await this.ListofProductsLocator.waitFor();
        const bool = await this.page.locator("h3:has-text('"+ProductName+"')").isVisible();
        
        expect(bool).toBeTruthy();
    }

    async navigatetocheckoutpage()
    {
        await this.CheckoutButtonLocator.click();
    }
}
module.exports = {CartPage};