(function() {
  'use strict';
  module.exports = FormBuilderRoutes;

  FormBuilderRoutes.$inject = ['$stateProvider', '$urlMatcherFactoryProvider'];

  function FormBuilderRoutes($stateProvider, $urlMatcherFactory) {
    $urlMatcherFactory.caseInsensitive(true);

    $stateProvider
      .state('form-builder', {
        parent: 'root',
        abstract: true
      });
  }
})();
