(function() {
  'use strict';
  module.exports = PaymentService;

  var moment = require('moment');
  var cookieNames = require('crds-constants').COOKIES;

  PaymentService.$inject = ['$http','$q', 'stripe', '$cookies', '$rootScope', 'GiveTransferService', 'MESSAGES'];

  function PaymentService($http, $q, stripe, $cookies, $rootScope, GiveTransferService, MESSAGES) {
    var paymentService = {
      createDonorWithBankAcct: createDonorWithBankAcct,
      createDonorWithCard: createDonorWithCard,
      createRecurringGiftWithBankAcct: createRecurringGiftWithBankAcct,
      createRecurringGiftWithCard: createRecurringGiftWithCard,
      donateToProgram: donateToProgram,
      donation: {},
      getDonor: getDonor,
      updateDonorWithBankAcct:updateDonorWithBankAcct,
      updateDonorWithCard:updateDonorWithCard,
      updateRecurringGiftWithBankAcct: updateRecurringGiftWithBankAcct,
      updateRecurringGiftWithCard: updateRecurringGiftWithCard,
      updateRecurringGiftDonorOnlyInformation: updateRecurringGiftDonorOnlyInformation,
      deleteRecurringGift: deleteRecurringGift,
      queryRecurringGifts: queryRecurringGifts,
      getRecurringGift: getRecurringGift,
      addGlobalErrorMessage: _addGlobalErrorMessage,
      stripeErrorHandler: stripeErrorHandler
    };

    stripe.setPublishableKey(__STRIPE_PUBKEY__);

    function createDonorWithBankAcct(bankAcct, email, firstName, lastName) {
      return apiDonor(bankAcct, email, firstName, lastName, stripe.bankAccount, 'POST');
    }

    function createDonorWithCard(card, email, firstName, lastName) {
      return apiDonor(card, email, firstName, lastName, stripe.card, 'POST');
    }

    function createRecurringGiftWithBankAcct(bankAcct, impersonateDonorId = null) {
      return buildNewRecurringGift(bankAcct, stripe.bankAccount, 'POST', null, impersonateDonorId);
    }

    function createRecurringGiftWithCard(card, impersonateDonorId = null) {
      return buildNewRecurringGift(card, stripe.card, 'POST', null, impersonateDonorId);
    }

    function updateRecurringGiftWithBankAcct(bankAcct, recurringGiftId, impersonateDonorId = null) {
      return buildNewRecurringGift(bankAcct, stripe.bankAccount, 'PUT', recurringGiftId, impersonateDonorId);
    }

    function updateRecurringGiftWithCard(card, recurringGiftId, impersonateDonorId = null) {
      return buildNewRecurringGift(card, stripe.card, 'PUT', recurringGiftId, impersonateDonorId);
    }

    function updateRecurringGiftDonorOnlyInformation(recurringGiftId, impersonateDonorId = null) {
      var def = $q.defer();
      apiRecurringGift('PUT', def, createRecurringGiftRequest(), recurringGiftId, impersonateDonorId);
      return def.promise;
    }

    function deleteRecurringGift(recurringGiftId, impersonateDonorId = null) {
      var def = $q.defer();
      apiRecurringGift('DELETE', def, null, recurringGiftId, impersonateDonorId);
      return def.promise;
    }

    function getRecurringGift(recurringGiftId, impersonateDonorId = null) {
      var def = $q.defer();
      apiRecurringGift('GET', def, null, recurringGiftId, impersonateDonorId);
      return def.promise;
    }

    function queryRecurringGifts(impersonateDonorId = null) {
      var def = $q.defer();
      apiRecurringGift('QUERY', def, null, null, impersonateDonorId);
      return def.promise;
    }

    function donateToProgram(program_id, campaignId, amount, donor_id, email_address, pymt_type, anonymous, trip_deposit) {
      var def = $q.defer();
      var donationRequest = {
        program_id: program_id,
        pledge_campaign_id: campaignId,
        pledge_donor_id: GiveTransferService.campaign.pledgeDonorId,
        gift_message: GiveTransferService.message,
        amount: amount,
        donor_id: donor_id,
        email_address: email_address,
        pymt_type: pymt_type,
        anonymous: anonymous,
        trip_deposit: trip_deposit
      };
      $http({
        method: 'POST',
        url: __API_ENDPOINT__ + 'api/donation',
        data: donationRequest,
        headers: {
              Authorization: $cookies.get(cookieNames.SESSION_ID)
            }
      }).success(function(data) {
        paymentService.donation = data;
        def.resolve(data);
      }).error(function(response, statusCode) {
        def.reject(_addGlobalErrorMessage(response.error, statusCode));
      });

      return def.promise;
    }

    function getDonor(email) {
      var encodedEmail = email ?
          encodeURI(email).replace(/\+/g, '%2B')
          :
          '';
      var def = $q.defer();
      $http({
        method: 'GET',
        url: __API_ENDPOINT__ + 'api/donor/?email=' + encodedEmail,
        headers: {
          Authorization: $cookies.get(cookieNames.SESSION_ID)
        }
      }).success(function(data) {
        def.resolve(data);
      }).error(function(response, statusCode) {
        def.reject(_addGlobalErrorMessage(response.error, statusCode));
      });

      return def.promise;
    }

    function stripeErrorHandler(error) {
      if (error && error.globalMessage) {
        GiveTransferService.declinedPayment =
              error.globalMessage.id === $rootScope.MESSAGES.paymentMethodDeclined.id;
        $rootScope.$emit('notify', error.globalMessage);
      } else {
        $rootScope.$emit('notify', $rootScope.MESSAGES.failedResponse);
      }

      GiveTransferService.processing = false;
    }

    function updateDonorWithBankAcct(donorId, bankAcct, email) {
      return apiDonor(bankAcct, email, null, null, stripe.bankAccount, 'PUT');
    }

    function updateDonorWithCard(donorId, card, email) {
      return apiDonor(card, email, null, null, stripe.card, 'PUT');
    }

    function _addGlobalErrorMessage(error, httpStatusCode) {
      var e = error ? error : {};
      e.httpStatusCode = httpStatusCode;

      if (e.globalMessage && e.globalMessage > 0) {
        // Short-circuit the logic below, as the API should have
        // already determined the message to display
        return e;
      }

      // This same logic exists on the .Net side in crds-angular/Services/StripeService.cs
      // This is because of the Stripe "tokens" call, which goes directly to Stripe, not via our API.  We
      // are implementing the same here in the interest of keeping our application somewhat agnostic to
      // the underlying payment processor.
      if (e.type === 'abort' || e.code === 'abort') {
        e.globalMessage = MESSAGES.paymentMethodProcessingError;
      } else if (e.type === 'card_error') {
        return processCardError(e);
      } else if (e.param === 'bank_account') {
        if (e.type === 'invalid_request_error') {
          e.globalMessage = MESSAGES.paymentMethodDeclined;
        }
      }

      return e;
    }

    function processCardError(e) {
      if (e.code === 'card_declined' ||
          /^incorrect/.test(e.code) ||
          /^invalid/.test(e.code)) {
        e.globalMessage = MESSAGES.paymentMethodDeclined;
      } else if (e.code === 'processing_error') {
        e.globalMessage = MESSAGES.paymentMethodProcessingError;
      }

      return e;
    }

    function apiDonor(donorInfo, email, firstName, lastName, stripeFunc, apiMethod) {
      var def = $q.defer();
      stripeFunc.createToken(donorInfo, function(status, response) {
        if (response.error) {
          def.reject(_addGlobalErrorMessage(response.error, status));
        } else {
          var donorRequest = { stripe_token_id: response.id, email_address: email, first_name: firstName, last_name: lastName };
          $http({
            method: apiMethod,
            url: __API_ENDPOINT__ + 'api/donor',
            headers: {
              Authorization:  $cookies.get(cookieNames.SESSION_ID)
            },
            data: donorRequest
          }).success(function(data) {
            paymentService.donor = data;
            def.resolve(data);
          }).error(function(response, statusCode) {
            def.reject(_addGlobalErrorMessage(response.error, statusCode));
          });
        }
      });

      return def.promise;
    }

    function buildNewRecurringGift(donorInfo, stripeFunc, apiMethod, recurringGiftId = null, impersonateDonorId = null) {
      var def = $q.defer();

      stripeFunc.createToken(donorInfo, function(status, response) {
        if (response.error) {
          def.reject(_addGlobalErrorMessage(response.error, status));
        } else {
          var recurringGiftRequest = createRecurringGiftRequest(response.id);
          apiRecurringGift(apiMethod, def, recurringGiftRequest, recurringGiftId, impersonateDonorId);
        }
      });

      return def.promise;
    }

    function createRecurringGiftRequest(token_id = null) {
      var recurringGiftRequest = {
        amount: GiveTransferService.amount,
        program: GiveTransferService.program.ProgramId,
        interval: GiveTransferService.givingType,
        start_date: GiveTransferService.recurringStartDate
      };

      if (token_id !== null) {
        recurringGiftRequest.stripe_token_id = token_id;
      }

      return recurringGiftRequest;
    }

    function apiRecurringGift(apiMethod, def, recurringGiftRequest = null, recurringGiftId = null, impersonateDonorId = null) {
      if (recurringGiftRequest && recurringGiftRequest.start_date) {
        recurringGiftRequest.start_date = moment(recurringGiftRequest.start_date).format('YYYY-MM-DD');
      }

      $http({
        method: apiMethod === 'QUERY' ? 'GET' : apiMethod,
        isArray: (apiMethod === 'QUERY'),
        url: apiRecurringGiftUrl(apiMethod, recurringGiftId, impersonateDonorId),
        headers: {
          Authorization: $cookies.get(cookieNames.SESSION_ID)
        },
        data: recurringGiftRequest
      }).success(function(data) {
        if (apiMethod === 'GET' || apiMethod === 'QUERY') {
          setStartDateWithDatePartOnly(data);
        }

        def.resolve(data);
      }).error(function(response, statusCode) {
        if (response !== null && response !== undefined) {
          def.reject(_addGlobalErrorMessage(response.error, statusCode));
        } else {
          def.reject();
        }
      });
    }

    function setStartDateWithDatePartOnly(data) {
      // Strip time off the start_date, so that we don't end up changing the date due to timezone conversion
      if (data) {
        if (Array.isArray(data)) {
          _.forEach(data, function(gift) {
            if (gift.start_date) {
              gift.start_date = moment(gift.start_date).utc().format('YYYY-MM-DD');
            }
          });
        } else if (data.start_date) {
          data.start_date = moment(data.start_date).utc().format('YYYY-MM-DD');
        }
      }
    }

    function apiRecurringGiftUrl(apiMethod, recurringGiftId = null, impersonateDonorId = null) {
      var queryParams = '';
      if (impersonateDonorId != null) {
        queryParams = '?impersonateDonorId=' + impersonateDonorId;
      }

      if (apiMethod === 'POST' || apiMethod === 'QUERY' || recurringGiftId === null) {
        return __API_ENDPOINT__ + 'api/donor/recurrence' + queryParams;
      }

      return __API_ENDPOINT__ + 'api/donor/recurrence/' + recurringGiftId + queryParams;
    }

    return paymentService;
  }

})();
