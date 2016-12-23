require('./tripDonations.html');
angular.module('crossroads.trips')
  .directive('tripDonations', require('./tripDonations.directive'))
  .controller('TripDonationsController', require('./tripDonations.controller'));
