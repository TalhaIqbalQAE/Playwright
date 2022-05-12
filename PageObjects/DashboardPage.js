const {expect} = require('@playwright/test');
class DashboardPage
{
    constructor(page)
    {
        this.page = page;

        this.arrayofproductsLocator = page.locator(".card-body b");
        this.ProductLocator = page.locator("//div[@class='card-body']");

        this.CartButtonLocator = page.locator("[routerlink*='cart']");
    }

    async addtoCart(ProductName)
    {
        const titles = await this.arrayofproductsLocator.allTextContents();
        
        const productcount = await this.ProductLocator.count();

        for(let i = 0; i < productcount; i++)
        {
            if (await this.ProductLocator.nth(i).locator("b").textContent() === ProductName)
            {
                await this.ProductLocator.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigatetoCartPage()
    {
        await this.CartButtonLocator.click();
    }
}
module.exports = {DashboardPage};