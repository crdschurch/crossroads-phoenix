(function(){
  'use strict';

  module.exports = QuestionsCtrl;

  QuestionsCtrl.$inject = [
    '$location',
    '$timeout',
    '$scope',
    '$state',
    '$window',
    'Responses',
    'ParticipantQuestionService'
  ];

  function QuestionsCtrl( $location,
                          $timeout,
                          $scope,
                          $state,
                          $window,
                          Responses,
                          ParticipantQuestionService
  ) {

    var vm = this;
    vm.upsellRedirect = upsellRedirect;

    $scope.initialize = function() {

      $scope.questions = _.reject($scope.questions, function(q) {
        return q.hidden !== undefined && q.hidden === true;
      });

      $scope.step = parseInt($location.hash()) || $scope.step;
      $scope.totalQuestions = _.size($scope.questions);

      // handle return to last questions if rejecting upsell
      if (_.has(Responses.data, 'bypassUpsell')) {
        $scope.step = $scope.totalQuestions;
      }

      $scope.responses = Responses.data;

      Object.defineProperty($scope, 'nextBtn', {
        get: function() {
          return $scope.isPrivateGroup() ? 'Make My Group Private' : ($scope.currentQuestion().next || 'Next');
        }
      });
    };

    $scope.previousQuestion = function() {
      $scope.applyErrors();
      $scope.$broadcast('groupFinderClearError');
      $scope.step--;
      $scope.provideFocus();
    };

    $scope.nextQuestion = function() {
      $scope.$broadcast('groupFinderClearError');

      if(_.any($scope.currentErrorFields())) {
        $scope.applyErrors();
        $scope.provideFocus();
      } else {
        $scope.go();
      }
    };

    $scope.go = function() {
      Responses.data.completed_flow = true;
      if($scope.mode === 'host' && $scope.isPrivateGroup()) {
        $state.go('group_finder.' + $scope.mode + '.review');
      } else if ($scope.step === $scope.totalQuestions) {
        $state.go('group_finder.' + $scope.mode + '.review');
      } else if (vm.upsellRedirect()) {
        $state.go('group_finder.' + $scope.mode + '.upsell');
      } else {
        Responses.data.completed_flow = false;
        $scope.step++;
        $scope.provideFocus();
      }
    };

    $scope.isPrivateGroup = function() {
      var isPrivate = false;
      if ($scope.currentKey() === 'filled_spots') {
        isPrivate = $scope.currentResponse() === $scope.responses['total_capacity'];
        $scope.responses['open_spots'] = $scope.responses['total_capacity'] - $scope.currentResponse();
      }
      return isPrivate;
    };

    $scope.currentResponse = function() {
      return $scope.responses[$scope.currentKey()];
    };

    $scope.currentKey = function() {
      return _.pluck($scope.questions, 'key')[$scope.step - 1];
    };

    $scope.currentQuestion = function() {
      return _.find($scope.questions, function(obj){
        return obj['key'] === $scope.currentKey();
      });
    };

    $scope.renderBtn = function(dir) {
      return dir;
    };

    $scope.startOver = function() {
      $scope.step = 1;
    };

    $scope.requiredFields = function() {
      var required = [];
      if ($scope.currentQuestion().required === true) {
        var visibleFields = $('input:visible, select:visible, textarea:visible');
        required = _.map(visibleFields, function(el,i) {
          var name = $(el).attr('name');
          if (name !== undefined){
            return name;
          }
        });
      }

      return _.compact(required);
    };

    $scope.currentErrorFields = function() {

      return _.chain($scope.requiredFields())
              .uniq()
              .map(function(name) {

                var pattern = /([^\[\]]*)(\[(.*)\])?/;
                var matches = name.match(pattern);
                var cleanedName = matches[1];
                var controlName = matches[3];

                var el = $('[name="' + name + '"]');
                var response = $scope.responses[cleanedName];

                if(typeof response === 'object') {
                  if(controlName === undefined) {
                    // multi-select value, ie. checkbox
                    var key = Object.keys(response);
                    response =_.some(response);
                  } else {
                    // compound group of fields, ie. address, date/time, etc.
                    response = response[controlName];
                  }
                }

                if (el.data('input-type') !== undefined) {
                  switch (el.data('input-type')) {
                    case 'zip':
                      if ($scope.validZip(el.val()) === false) {
                        response = '';
                      }
                  }
                }

                if (el.attr('name') === 'date_and_time[day]') {
                  if (Responses.data.date_and_time.time === null) {
                    response = '';
                  }
                }

                var hasError = (response === undefined || response === '' || response === false);

                return hasError ? el : false;
              })
              .compact()
              .value();
    };

    $scope.applyErrors = function() {
      $scope.$broadcast('groupFinderShowError');

      _.each($scope.currentErrorFields(), function(el){
        if(el.val() === '' || el.val().indexOf('undefined') > -1) {
          $scope.$broadcast('groupFinderShowError');
        }
        if (el.attr('name') === 'date_and_time[day]') {
          if (Responses.data.date_and_time.time === null) {
            $scope.$broadcast('groupFinderTimeError');
          }
        }
        if (el.data('input-type') !== undefined) {
          switch (el.data('input-type')) {
            case 'zip':
              if (el.val() && $scope.validZip(el.val()) === false) {
                $scope.$broadcast('groupFinderClearError');

                $scope.$broadcast('groupFinderZipError');
              }
          }
        }
      });
    };

    $scope.validZip = function(zip) {
      var pattern = /^\d{5}(?:[-\s]\d{4})?$/;
      var result = true;
      if (zip.match(pattern) === null) {
        result = false;
      }
      return result;
    };

    $scope.provideFocus = function() {
      $timeout(function() {
        var el = $('input, select').filter('[name*=' + $scope.currentKey() + ']').first();
            el.focus();
      },100);
    };

    // ----------------------------------- //

    $scope.$watch('step', function(step) {
      $location.hash(step);
      $scope.$broadcast('stepChange', step);
    });

    $window.onhashchange = function(e) {
      var hash = $location.hash();
      if( hash &&
          $.isNumeric(hash) &&
          parseInt(hash) !== $scope.step) {
        $scope.step = parseInt(hash);
      }
    };

    function upsellRedirect() {
      return Responses.data.joinFlow &&
        ParticipantQuestionService.showUpsell(Responses.data.prior_participation) &&
        _.has(Responses.data, 'location') &&
        $scope.currentQuestion().title === 'location' &&
        $scope.mode !== 'host';
    }

    // ----------------------------------- //

    $scope.initialize();
  }

})();
