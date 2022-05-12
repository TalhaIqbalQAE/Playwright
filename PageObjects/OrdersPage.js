const {expect} = require('@playwright/test');
class OrdersPage
{
    constructor(page)
    {
        this.page = page;
    }

    async findOrderinOrdersList(OrderID)
    {
        const ordersrows = await this.page.locator("//tbody//tr");

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
    }
}
module.exports = {OrdersPage};