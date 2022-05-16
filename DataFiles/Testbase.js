const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testdataasfixture :
        {
            fullname : "dummyaccount",
            useremail : "dummyaccount@gmail.com"
        }
    }
)
