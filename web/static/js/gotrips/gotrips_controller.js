(function () {
  'use strict';
  module.exports = GoTripsCtrl;

  GoTripsCtrl.$inject = ['$scope', '$stateParams', '$log', '$location', '$anchorScroll'];

function GoTripsCtrl($scope, $stateParams, $log, $location, $anchorScroll) {
		var vm = this;

		vm.isCollapsed = true;
		vm.phoneToggle = true;
    vm.pageTitle = $stateParams.trip_location;
    vm.friendlyPageTitle;
    vm.tripName;
    vm.whyPlaceholder = 'Please be specific.';

    switch(vm.pageTitle) {
      case 'nola':
        vm.friendlyPageTitle = 'New Orleans';
        vm.tripName = "2015 July New Orleans Men's Trip";
        break;
      case 'south-africa':
        vm.friendlyPageTitle = 'South Africa';
        vm.tripName = '2015 Oct SA Topsy Trip';
        break;
      case 'india':
        vm.friendlyPageTitle = 'India';
        vm.tripName = '2015 SEPT India JA Annual';
        vm.whyPlaceholder = 'Please be specific. In instances where we have a limited number of spots, we strongly consider responses to this question.';
        break;
      case 'nicaragua':
        vm.friendlyPageTitle = 'Nicaragua';
        vm.tripName = '2015 Winter Kickoff Trip';
        break;
    }

		vm.buttonClickBack = function(){
			console.log("in here");
		};

		vm.householdPhoneFocus = function () {
			vm.isCollapsed = false;

			$location.hash('homephonecont');

			setTimeout(function () {
					$anchorScroll();
			}, 500);

		};
	};
})()
