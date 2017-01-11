(function() {

  module.exports = creditCardInfo;

  creditCardInfo.$inject = ['$log', '$rootScope', '$timeout'];

  function creditCardInfo($log, $rootScope, $timeout) {
    //Credit Card RegExs
    var americanExpressRegEx = /^3[47][0-9]{13}$/;
    var discoverRegEx = /^6(?:011|5[0-9]{2})/;
    var mastercardRegEx = /^5[1-5][0-9]/;
    var visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;

    var directive = {
      restrict: 'EA',
      scope: {
        ccNumber: '=',
        expDate: '=',
        cvc: '=',
        billingZipCode: '=',
        bankinfoSubmitted: '=',
        defaultSource: '=',
        changeAccountInfo: '=',
        setValidCard: '=',
        declinedPayment: '=',
        setValidCvc: '=',
        ccNumberClass: '='
      },
      templateUrl: 'creditCardInfo/creditCardInfo.html',
      link: link
    };
    return directive;

    function link(scope, element, attrs) {
      scope.creditCard = scope;

      // Emits a growl notification encouraging checking/savings account
      // donations, rather than credit card
      $rootScope.$emit(
          'notify',
          $rootScope.MESSAGES.creditCardDiscouraged,
          1001,
          -1 // Indicates that this message should not time out
          );

      // This is a hack to keep from tabbing on the close button on the growl message.
      // There is no option in Growl to make the close button not tabbable...
      $timeout(function() {
        var closeButton = document.querySelector('#creditCardDiscouraged .close');
        if (closeButton) {
          closeButton.tabIndex = -1;
        }
      }, 0);

      scope.billingZipCodeError = function() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return ((scope.creditCardForm.billingZipCode.$dirty ||
              scope.bankinfoSubmitted) &&
            (scope.creditCardForm.billingZipCode.$modelValue === undefined ||
                 scope.creditCardForm.billingZipCode.$invalid));
      };

      scope.blurBillingZipCodeError = function() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (scope.creditCardForm.billingZipCode.$dirty && scope.creditCardForm.billingZipCode.$invalid);
      };

      scope.ccCardType = function() {
        var ccNumber = scope.creditCardForm.ccNumber;
        if (ccNumber && ccNumber.$modelValue) {
          ccNumber = ccNumber.$modelValue;
          if (ccNumber.match(visaRegEx)) {
            scope.ccNumberClass = 'cc-visa';
          } else if (ccNumber.match(mastercardRegEx)) {
            scope.ccNumberClass = 'cc-mastercard';
          } else if (ccNumber.match(discoverRegEx)) {
            scope.ccNumberClass = 'cc-discover';
          } else if (ccNumber.match(americanExpressRegEx)) {
            scope.ccNumberClass = 'cc-american-express';
          } else {
            scope.ccNumberClass = '';
          }
        } else if (!!scope.defaultCardPlaceholderValues && !!scope.defaultCardPlaceholderValues.brand) {
          if (scope.defaultCardPlaceholderValues.brand === 'Visa') {
            scope.ccNumberClass = 'cc-visa';
          } else if (scope.defaultCardPlaceholderValues.brand === 'MasterCard') {
            scope.ccNumberClass = 'cc-mastercard';
          } else if (scope.defaultCardPlaceholderValues.brand === 'Discover') {
            scope.ccNumberClass = 'cc-discover';
          } else if (scope.defaultCardPlaceholderValues.brand === 'American Express') {
            scope.ccNumberClass = 'cc-american-express';
          } else {
            scope.ccNumberClass = '';
          }
        } else {
          scope.ccNumberClass = '';
        }
      };

      scope.ccNumberError = function(ccValid) {
        if (ccValid === undefined) {
          scope.setValidCard = false;
        }

        if (ccValid === true) {
          scope.setValidCard = true;
        }

        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (!ccValid && scope.bankinfoSubmitted  ||            //cannot be invalid upon submittal
                 scope.creditCardForm.ccNumber.$dirty &&
                 !ccValid || //cannot be invalid prior to submittal
                 scope.creditCard.ccNumber === undefined &&
                 scope.bankinfoSubmitted); //cannot be blank when submitting change form
      };

      scope.cvvError = function(cvcValid) {
        if (cvcValid === undefined) {
          scope.setValidCvc = false;
        }

        if (cvcValid === true) {
          scope.setValidCvc = true;
        }

        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (!cvcValid && scope.bankinfoSubmitted  ||       //cannot be invalid upon submittal
                 scope.creditCardForm.cvc.$dirty &&
                 !cvcValid || //cannot be invalid prior to submittal
                 scope.creditCard.cvc === undefined &&
                 scope.bankinfoSubmitted); //cannot be blank when submitting change form
      };

      scope.expDateError = function() {
        if (scope.useExistingAccountInfo()) {
          return false;
        }

        return (scope.bankinfoSubmitted && scope.creditCardForm.expDate.$invalid);
      };

      scope.resetDefaultCardPlaceholderValues = function() {
        scope.defaultCardPlaceholderValues = {
          expDate: 'MM/YY',
        };
        scope.declinedPayment = false;
      };

      // This function swaps the expDate field with the current value placeholder
      // for the expDate field with the "MM/YY" placeholder.  This works around
      // an issue with using ui-mask and a placeholder value, otherwise we'd
      // simply use a dynamic placeholder.
      scope.swapCreditCardExpDateFields = function() {
        if (scope.changeAccountInfo) {
          scope.creditCardForm.$setDirty();
          $timeout(function() {
            // The second field is the expDate
            var e = element.find('input')[1];
            e.focus();
          }, 0);
        }
      };

      scope.submitError = function(cardValue) {
        return ((!scope.useExistingAccountInfo()) &&
              scope.bankinfoSubmitted && (cardValue === '' || cardValue === undefined));
      };

      scope.useExistingAccountInfo = function() {
        return (scope.changeAccountInfo && scope.creditCardForm.$pristine);
      };

      if (scope.defaultSource !== undefined) {
        if (!scope.defaultSource.credit_card) {
          scope.resetDefaultCardPlaceholderValues();
        } else if (scope.defaultSource.credit_card.last4) {
          scope.creditCard.ccNumber = '';
          scope.creditCard.expDate = '';
          scope.creditCard.cvc = '';
          scope.creditCard.billingZipCode = '';
          scope.defaultCardPlaceholderValues = {
            billingZipCode: scope.defaultSource.credit_card.address_zip,
            brand: scope.defaultSource.credit_card.brand,
            cvc: 'XXX',
            expDate: scope.defaultSource.credit_card.exp_date.replace(/^(..)(..).*$/, '$1/$2'),
            maskedCard: 'XXXXXXXXXXX' + scope.defaultSource.credit_card.last4
          };

          scope.ccCardType();
        }
      }
    }
  }
})();
