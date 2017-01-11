(function() {
  'use strict';

  module.exports = bankInfo;

  bankInfo.$inject = ['$log', '$rootScope', '$timeout'];

  function bankInfo($log, $rootScope, $timeout) {
    var directive = {
      restrict: 'EA',
      replace: true,
      scope: {
        account: '=',
        accountHolderName: '=',
        accountHolderType: '=',
        bankinfoSubmitted: '=',
        changeAccountInfo: '=',
        defaultSource: '=',
        routing: '=',
        declinedPayment: '='
      },
      templateUrl: 'bankInfo/bankInfo.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {

      scope.bankAccount = scope;
      scope.accountError = accountError;
      scope.blurAccountError = blurAccountError;
      scope.blurAccountHolderNameError = blurAccountHolderNameError;
      scope.blurRoutingError = blurRoutingError;
      scope.resetDefaultBankPlaceholderValues = resetDefaultBankPlaceholderValues;

      scope.accountHolderNameError = accountHolderNameError;
      scope.accountHolderTypeError = accountHolderTypeError;
      scope.routingError = routingError;
      scope.useExistingAccountInfo = useExistingAccountInfo;

      activate();

      ////////////////////////////////
      //// IMPLEMENTATION DETAILS ////
      ////////////////////////////////

      function activate() {
        scope.bankAccount.accountHolderType = 'individual';

        if (scope.defaultSource !== undefined) {
          if (!scope.defaultSource.bank_account) {
            scope.resetDefaultBankPlaceholderValues();
          } else if (scope.defaultSource.bank_account.last4) {
            scope.bankAccount.account = '';
            scope.bankAccount.accountHolderName = '';
            scope.bankAccount.accountHolderType = scope.defaultSource.bank_account.accountHolderType || 'individual';
            scope.bankAccount.routing = '';

            scope.defaultBankPlaceholderValues = {
              accountHolderName: scope.defaultSource.bank_account.accountHolderName,
              accountHolderType: scope.defaultSource.bank_account.accountHolderType,
              routing: scope.defaultSource.bank_account.routing,
              maskedAccount: 'XXXXXXXXXXX' + scope.defaultSource.bank_account.last4
            };
          }
        }
      }

      function accountError() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (scope.bankinfoSubmitted &&
          scope.bankAccountForm.account.$error.invalidAccount &&
          scope.bankAccountForm.$invalid ||
          scope.bankAccountForm.account.$error.invalidAccount &&
          scope.bankAccountForm.account.$dirty
        );
      }

      function accountHolderNameError() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (scope.bankinfoSubmitted &&
          scope.bankAccountForm.accountHolderName.$error.required &&
          scope.bankAccountForm.$invalid ||
          scope.bankAccountForm.accountHolderName.$error.required &&
          scope.bankAccountForm.accountHolderName.$dirty
        );
      }

      function accountHolderTypeError() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (scope.bankinfoSubmitted &&
          scope.bankAccountForm.accountHolderType.$error.required &&
          scope.bankAccountForm.$invalid ||
          scope.bankAccountForm.accountHolderType.$error.required &&
          scope.bankAccountForm.accountHolderType.$dirty
        );
      }

      function blurAccountError() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (scope.bankAccountForm.account.$dirty && scope.bankAccountForm.account.$error.invalidAccount);
      }

      function blurAccountHolderNameError() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        var accountHolderName = scope.bankAccountForm.accountHolderName;
        return (accountHolderName.$dirty && accountHolderName.$error.required);
      }

      function blurRoutingError() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (scope.bankAccountForm.routing.$dirty && scope.bankAccountForm.routing.$error.invalidRouting);
      }

      function resetDefaultBankPlaceholderValues() {
        if (scope.useExistingAccountInfo()) {
          scope.bankAccount.accountHolderType = 'individual';
        }

        scope.defaultBankPlaceholderValues = {};
        scope.declinedPayment = false;
      }

      function routingError() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (scope.bankinfoSubmitted &&
          scope.bankAccountForm.routing.$error.invalidRouting &&
          scope.bankAccountForm.$invalid ||
          scope.bankAccountForm.routing.$error.invalidRouting &&
          scope.bankAccountForm.routing.$dirty
        );
      }

      function useExistingAccountInfo() {
        return scope.changeAccountInfo && scope.bankAccountForm.$pristine;
      }
    }
  }
})();
