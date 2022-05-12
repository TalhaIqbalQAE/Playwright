const {LoginPage} = require("../PageObjects/LoginPage");
const {DashboardPage} = require("../PageObjects/DashboardPage");
const {CartPage} = require("../PageObjects/CartPage");
const {CheckoutPage} = require("../PageObjects/CheckoutPage");
const {OrdersPage} = require("../PageObjects/OrdersPage");

class POMManager
{
    constructor(page)
    {
        this.POMLoginPage = new LoginPage(page);
        this.POMDashboardPage = new DashboardPage(page);
        this.POMCartPage = new CartPage(page);
        this.POMCheckoutPage = new CheckoutPage(page);
        this.POMOrdersPage = new OrdersPage(page);
    }

    getLoginPage()
    {
        return this.POMLoginPage;
    }

    getDashboardPage()
    {
        return this.POMDashboardPage;
    }

    getCartPage()
    {
        return this.POMCartPage;
    }

    getChechoutPage()
    {
        return this.POMCheckoutPage;
    }

    getOrdersPage()
    {
        return this.POMOrdersPage;
    }
}
module.exports = {POMManager};