(function() {
  'use strict';

  module.exports = bankCreditCardDetails;

  bankCreditCardDetails.$inject = ['$log', '$timeout', 'Session', '$rootScope'];

  function bankCreditCardDetails($log, $timeout, Session, $rootScope) {
    var directive = {
      replace: true,
      restrict: 'EA',
      templateUrl: 'bankCreditCardDetails/bankCreditCardDetails.html',
      scope: {
        dto: '=',
        bankInfoSubmitted: '=',
        donor: '=',
        email: '=',
        setValidCard: '=',
        setValidCvc: '=',
        accountStateName: '@'
      },
      link: link,
    };
    return directive;

    function link(scope, element, attrs) {

      scope.togglePaymentInfo = togglePaymentInfo;

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
        if (toState.name === scope.accountStateName && Session.isActive()) {
          togglePaymentInfo();
        }
      });

      ////////////////////////////////
      //// IMPLEMENTATION DETAILS ////
      ////////////////////////////////

      function togglePaymentInfo() {
        $timeout(function() {
          var e = scope.dto.view === 'cc' ?
            document.querySelector('[name=\'ccNumber\']') : document.querySelector('[name=\'routing\']');
          e.focus();
        }, 0);
      }

    }
  }
})();
