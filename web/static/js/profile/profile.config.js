'use strict()';
(function(){
 
  var app = angular.module('crossroads.profile');
  var cookieNames = require('crds-constants').COOKIES;
  app.config(config);
  
  app.$inject = ['$httpProvider'];
  
  function config($httpProvider){
    $httpProvider.defaults.timeout = 15000;
    $httpProvider.defaults.useXDomain = true; 
    $httpProvider.defaults.headers.common['Authorization']= crds_utilities.getCookie(cookieNames.SESSION_ID);
  };
  
})()
