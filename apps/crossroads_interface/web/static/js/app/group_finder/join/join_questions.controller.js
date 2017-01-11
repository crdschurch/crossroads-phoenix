(function(){
  'use strict';

  module.exports = JoinQuestionsCtrl;

  JoinQuestionsCtrl.$inject = ['$scope', 'Responses', 'QuestionDefinitions', 'AuthenticatedPerson'];

  function JoinQuestionsCtrl($scope, Responses, QuestionDefinitions, AuthenticatedPerson) {

    var vm = this;
    vm.questions = QuestionDefinitions;
    vm.currentStep = $scope.$parent.currentStep;
    vm.responses = $scope.responses = Responses.data;

    Responses.data.joinFlow = true;

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

  }

})();
