const {test} = require('@playwright/test');
const { POMManager } = require('../PageObjects/POMManager');

//Include JSON File
//Conversion format JSON-->STRING-->JS object

//const data = JSON.parse(JSON.stringify(require("../DataFiles/AddtoCart.json")));

const data = require("../DataFiles/AddtoCart.json");

test.only('Add to Cart Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await browser.newPage();

    //#region Objects
        const pomManager = new POMManager(page);

        const POMLoginPage = pomManager.getLoginPage();
        const POMDashboardPage = pomManager.getDashboardPage();
        const POMCartPage = pomManager.getCartPage();
        const POMCheckoutPage = pomManager.getChechoutPage();
        const POMOrdersPage = pomManager.getOrdersPage();
    //#endregion


    //Navigate to URL
    await POMLoginPage.GotoURL();

    //Login
    await POMLoginPage.validLogin(data.email, data.password);

    console.log(data.email);
    console.log(data.password);

    //Adding to Cart
    await POMDashboardPage.addtoCart(data.ProductName);

    //Navigating to cart page
    await POMDashboardPage.navigatetoCartPage();

    //Added to cart Assertion
    await POMCartPage.checkforProductAvailability(data.ProductName);

    //Navigate to Checkout
    await POMCartPage.navigatetocheckoutpage();
    
    //Fill Info
    await POMCheckoutPage.fillCheckoutInfo();

    //Get order Id of purchased product for assertion
    const OrderID = await POMCheckoutPage.getInfoFromOrderReceipt();

    //Navigate to orders page
    await POMCheckoutPage.navigatetoOrdersPage();

    //Finding the order in Orders list
    await POMOrdersPage.findOrderinOrdersList(OrderID);
    
    //Slight Pause
    await page.pause();
});