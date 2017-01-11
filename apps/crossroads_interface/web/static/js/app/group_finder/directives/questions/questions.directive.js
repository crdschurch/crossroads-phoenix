(function(){
  'use strict';

  module.exports = QuestionsDirective;

  QuestionsDirective.$inject = [];

  function QuestionsDirective() {

    return {
      restrict: 'AE',
      scope: {
        mode: '@mode',
        step: '=',
        questions: '=definitions',
        responses: '='
      },
      templateUrl: 'questions/questions.html',
      controller: 'QuestionsCtrl'
    };

  }

})();
