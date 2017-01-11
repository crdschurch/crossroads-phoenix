// DonationDetails Directive
require('./donationDetails.html');

var constants = require('../../../constants');

angular.module(constants.MODULES.COMMON)
    .directive('donationDetails', require('./donationDetails.directive'));

