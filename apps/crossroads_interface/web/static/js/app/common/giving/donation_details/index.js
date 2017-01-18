// DonationDetails Directive
require('./donationDetails.html');

var constants = require('crds-constants');

angular.module(constants.MODULES.COMMON)
    .directive('donationDetails', require('./donationDetails.directive'));

