(function() {
  'use strict';

  module.exports = JoinUpsellCtrl;

  JoinUpsellCtrl.$inject= ['$state', 'Responses'];

  function JoinUpsellCtrl($state, Responses) {
    var vm = this;
    vm.goToHost = goToHost;
    vm.returnToQuestions = returnToQuestions;

    function goToHost() {
      $state.go('group_finder.host');
    }

    function returnToQuestions() {
      Responses.data.bypassUpsell = true;
      $state.go('group_finder.join.questions');
    }
  }
})();