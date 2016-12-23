(function(){
  'use strict';

  module.exports = QuestionDirective;

  QuestionDirective.$inject = [];

  function QuestionDirective() {
    return {
      restrict: 'AE',
      scope: {
        model: '@model',
        definition: '=',
        responses: '='
      },
      templateUrl: 'question/question.html',
      controller: 'QuestionCtrl'
    };
  }

})();
