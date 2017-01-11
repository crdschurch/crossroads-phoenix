(function(){
  'use strict';

  module.exports = LoadingButton;

  LoadingButton.$inject = [];

  function LoadingButton() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        inputType: '@inputType',
        normalText: '@normalText',
        loadingText: '@loadingText',
        loadingClass: '@loadingClass',
        loading: '=loading',
        inputClasses: '@inputClasses'
      },
      templateUrl: 'loadingButton/loadingButton.html',
      link: link
    };
  }

  function link(scope,el,attr) {

    scope.buttonClass = buttonClass;
    scope.buttonText = buttonText;
    scope.showInput = showInput;

    ////////////////////////////

    function buttonClass() {
      return scope.loading ? scope.loadingClass : '';
    }

    function buttonText() {
      return scope.loading ? scope.loadingText : scope.normalText;
    }

    function showInput() {
      return scope.inputType === 'submit';
    }
  }

})();
