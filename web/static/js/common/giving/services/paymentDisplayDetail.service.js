(function () {
  'use strict';

  module.exports = PaymentDisplayDetailService;

  PaymentDisplayDetailService.$inject = [];

  function PaymentDisplayDetailService() {
    var paymentDisplayDetailService = {
      postProcess: postProcess,
      setDisplayDetails: setDisplayDetails,
      getCardIcon: getCardIcon,
    };

    function postProcess(paymentsDisplayInput) {
      var paymentsDisplay = _.transform(paymentsDisplayInput, function (result, p) {
        var paymentsDisplay = _.cloneDeep(p);
        setDisplayDetails(paymentsDisplay.source);
        result.push(paymentsDisplay);
      });

      return paymentsDisplay;
    }

    function setDisplayDetails(source) {
      switch (source.type) {
        case 'SoftCredit':
          break;
        case 'Cash':
          source.icon = 'money';
          source.viewBox = '0 0 34 32';
          break;
        case 'Bank':
          source.viewBox = '0 0 32 32';
          if (source.last4 !== undefined) {
            source.icon = 'library';
            source.name = 'ending in ' + source.last4;
          } else {
            source.icon = '';
          }

          break;
        case 'Check':
          source.viewBox = '0 0 32 32';
          if (source.last4 !== undefined) {
            source.icon = 'library';
            source.name = 'ending in ' + source.last4 + ' | Check #' + source.check_number;
          } else {
            source.icon = '';
            source.name = 'Check #' + source.check_number;
          }

          break;
        case 'CreditCard':
          source.icon = getCardIcon(source.brand);
          source.viewBox = '0 0 160 100';
          if (source.last4 !== undefined) {
            source.name = 'ending in ' + source.last4;
          }

          break;

      }
    }

    function getCardIcon(brand) {
      switch (brand) {
        case 'Visa':
          return ('cc_visa');
        case 'MasterCard':
          return ('cc_mastercard');
        case 'Discover':
          return ('cc_discover');
        case 'AmericanExpress':
          return ('cc_american_express');
        default:
          return ('');
      }
    }

    return paymentDisplayDetailService;
  }
})();
