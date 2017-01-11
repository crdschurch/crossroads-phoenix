(function() {
  'use strict';

  module.exports = FormBuilder;

  FormBuilder.$inject = [];

  function FormBuilder() {
    return {
      restrict: 'E',
      scope: {
        page: '=?',
      },
      templateUrl: 'templates/formBuilder.html',
      controller: 'FormBuilderCtrl',
      controllerAs: 'formBuilder',
      bindToController: true,
    };
  }

})();
