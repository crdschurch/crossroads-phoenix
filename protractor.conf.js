var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');
var moment = require('moment');

exports.config = {
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.53.1.jar',
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/**/*.e2e.js'],
  //specs: ['C:\\Source_CDN\\crossroads.net\\e2e\\myserve\\editProfile.e2e.js'],
  multiCapabilities: [
  //{ browserName: 'firefox'}  
  //{ browserName: 'firefox'}
  { browserName: 'chrome'}
  //,{ browserName: 'safari'}
  ],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 40000,
    includeStackTrace:true
  },
  getPageTimeout: 60000,
  
  onPrepare: function () {
    //Maximize the browser
    browser.driver.manage().window().maximize();
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: './protractor-result',
      takeScreenShotsOnlyForFailedSpecs: true,
      docTitle: 'Test Results: '+moment().format("MMDDYYYY"),
      pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
        return path.join(capabilities.caps_.browserName, descriptions.join('-'));
      }
    }));
  },
}
