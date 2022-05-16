const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 1,    //This will retry failed tests 1 more time
  workers: 3,    //How many files should run in parallel if trigger all the files
  timeout: 30 * 1000,
  
  expect: {

    timeout: 5000

  },
  
  reporter: 'html',

  projects: [
    {
      name : "Firefox_Execution",
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        //Setting up custom device
        //...devices['Galaxy S9+']

        //Control HTTPS errors --> 2-ways
        //ignoreHttpsErrors : true  //1
        //permissions: ['geolocation']   //2
      }
    },

    {
      name : "Chrome_Execution",
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        //Setting up custom dimensions
        //viewport: {width:720, height: 720}
      }
    }
  ],

};

module.exports = config;
