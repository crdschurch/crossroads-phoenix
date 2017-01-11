(function(){
  'use strict';

  module.exports = HostQuestionsCtrl;

  HostQuestionsCtrl.$inject = [
    '$scope',
    'Responses',
    'QuestionDefinitions',
    'GROUP_TYPES',
    'AuthenticatedPerson',
    '$state'
  ];

  function HostQuestionsCtrl($scope, Responses, QuestionDefinitions, GROUP_TYPES, AuthenticatedPerson, $state) {

    var vm = this;
    vm.questions = QuestionDefinitions;
    vm.currentStep = $scope.$parent.currentStep;
    vm.responses = $scope.responses = Responses.data;
    vm.getGroupType = getGroupType;
    vm.getGroupTime = getGroupTime;
    vm.getGroupAffinities = getGroupAffinities;
    vm.getGroupDistance = getGroupDistance;
    vm.updateDetails = updateDetails;
    vm.initialize = initialize;

    $scope.details = {};

    $scope.$watch('responses', function(responses) {
      vm.updateDetails();
    }, true);

    function initialize() {
      if (_.has(Responses, 'started') === false) {
        $state.go('group_finder.host');
      }

      if (_.has(Responses.data, 'location') === false) {
        if (AuthenticatedPerson.city !== null &&
            AuthenticatedPerson.state !== null &&
            AuthenticatedPerson.postalCode !== null &&
            AuthenticatedPerson.addressLine1 !== null) {
          Responses.data.location = {
            city:   AuthenticatedPerson.city,
            state:  AuthenticatedPerson.state,
            zip:    AuthenticatedPerson.postalCode,
            street: AuthenticatedPerson.addressLine1
          };
        }
      }
      if (_.has(Responses.data, 'date_and_time') === false) {
        Responses.data.date_and_time = {};
        Responses.data.date_and_time.time = moment().hours(moment().hour()).minute(0)._d;
      }
    }

    function getGroupType() {
      if(vm.responses && _.contains(Object.keys(vm.responses),'group_type')) {
        return GROUP_TYPES[vm.responses.group_type];
      }
    }

    function getGroupTime() {
      if(vm.responses && _.contains(Object.keys(vm.responses),'date_and_time')) {
        return vm.responses.date_and_time['day'] + 's, ' +
               vm.responses.date_and_time['time'] + vm.responses.date_and_time['ampm'];
      }
    }

    function getGroupAffinities() {
      return [
        'Kids welcome',
        'Has a cat',
        'Has a dog'
      ];
    }

    function getGroupDistance() {
      return '0 miles from you';
    }

    // TODO This should be a factory
    function updateDetails() {
      $scope.details = {
        affinities: vm.getGroupAffinities(),
        distance: vm.getGroupDistance(),
        type: vm.getGroupType(),
        time: vm.getGroupTime()
      };
    }

    vm.initialize();

  }

})();
