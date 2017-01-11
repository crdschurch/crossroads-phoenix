(function(){
  'use strict';

  module.exports = QuestionCtrl;

  var constants = require('./constants');

  QuestionCtrl.$inject = ['$timeout', '$scope', '$compile', 'Responses'];

  function QuestionCtrl($timeout, $scope, $compile, Responses) {

    $scope.initialize = function() {
      $scope.states = constants.US_STATES;
      $scope.header = $compile('<span>' + $scope.definition.header + '<span>')($scope);
      $scope.description = $compile('<span>' + $scope.definition.description + '<span>')($scope);
      $scope.body = $compile('<span>' + $scope.definition.body + '<span>')($scope);
      $scope.help = $compile('<span>' + $scope.definition.help + '<span>')($scope);
      $scope.footer = $compile('<span>' + $scope.definition.footer + '<span>')($scope);
      $scope.required = $scope.definition.required;
      $scope.errorMessage = 'All Fields are Required';

      if ($scope.definition.customErrorMessage) {
        $scope.errorMessage = $scope.definition.customErrorMessage;
      }

      $scope.setupSlider();
    };

    $scope.setupSlider = function() {
      var key = $scope.definition.key;
      $scope.sliderOptions = {
        hideLimitLabels: true,
        showSelectionBar: true,
        floor: (key === 'filled_spots' ? 0 : 3),
        ceil: (key === 'filled_spots' ? $scope.responses.total_capacity : 12)
      };
      $scope.sliderDefault = (key === 'filled_spots' ? 0 : 7);
      if (key === 'filled_spots' && $scope.responses.filled_spots > $scope.responses.total_capacity) {
        $scope.responses.filled_spots = null;
      }
      $scope.refreshSlider();
    };

    $scope.getTemplateUrl = function () {
      return 'question/input_'+ $scope.definition.input_type +'.html';
    };

    $scope.checkError = function() {
      if ($scope.required) {
        $scope.$parent.applyErrors();
      }
    };

    $scope.render = function(el) {
      return $scope[el].html();
    };

    $scope.refreshSlider = function () {
      $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      });
    };

    $scope.$on('stepChange', function(event, step) {
      if($scope.definition.input_type === 'number' && $scope.$parent.step === step) {
        $scope.setupSlider();
      }
    });

    $scope.$on('groupFinderShowError', function(event) {
      $scope.showError = true;
    });
    $scope.$on('groupFinderClearError', function(event) {
      $scope.showError = false;
      $scope.showZipError = false;
      $scope.showTimeError = false;
    });
    $scope.$on('groupFinderZipError', function(event) {
      $scope.showZipError = true;
    });
    $scope.$on('groupFinderTimeError', function(event) {
      $scope.showTimeError = true;
    });

    // ----------------------------------- //

    $scope.initialize();
  }

})();
