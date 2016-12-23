(function() {
  'use strict';

  module.exports = DonationService;

  DonationService.$inject = [
    '$rootScope',
    'Session',
    'GiveTransferService',
    'PaymentService',
    'GiveFlow',
    '$state',
    'CC_BRAND_CODES',
    '$q'
  ];

  function DonationService($rootScope, Session, GiveTransferService, PaymentService, GiveFlow, $state, CC_BRAND_CODES, $q) {
    var donationService = {
      bank: {},
      card: {},
      createBank: createBank,
      createCard: createCard,
      createDonorAndDonate: createDonorAndDonate,
      createRecurringGift: createRecurringGift,
      confirmDonation: confirmDonation,
      donate: donate,
      processBankAccountChange: processBankAccountChange,
      processChange: processChange,
      processCreditCardChange: processCreditCardChange,
      transitionForLoggedInUserBasedOnExistingDonor: transitionForLoggedInUserBasedOnExistingDonor,
      submitBankInfo: submitBankInfo,
      submitChangedBankInfo: submitChangedBankInfo,
      updateDonorAndDonate: updateDonorAndDonate,
      deleteRecurringGift: deleteRecurringGift,
      getRecurringGift: getRecurringGift,
      queryRecurringGifts: queryRecurringGifts,
      updateRecurringGift: updateRecurringGift,
      adminCreateRecurringGift: adminCreateRecurringGift,
    };

    function createBank() {
      try {
        donationService.bank = {
          country: 'US',
          currency: 'USD',
          routing_number: GiveTransferService.donor.default_source.routing,
          account_number: GiveTransferService.donor.default_source.bank_account_number,
          account_holder_name: GiveTransferService.donor.default_source.account_holder_name,
          account_holder_type: GiveTransferService.donor.default_source.account_holder_type
        };
      } catch(err) {
        throw new Error('Unable to create bank account');
      }

    }

    function createCard() {
      try {
        donationService.card = {
          name: GiveTransferService.donor.default_source.name,
          number: GiveTransferService.donor.default_source.cc_number,
          exp_month: GiveTransferService.donor.default_source.exp_date.substr(0, 2),
          exp_year: GiveTransferService.donor.default_source.exp_date.substr(2, 2),
          cvc: GiveTransferService.donor.default_source.cvc,
          address_zip: GiveTransferService.donor.default_source.address_zip
        };
      } catch(err) {
        throw new Error('Unable to create credit card');
      }
    }

    function createDonorAndDonate(programsInput) {
      var pgram;
      if (programsInput !== undefined) {
        pgram = _.find(programsInput, { ProgramId: GiveTransferService.program.ProgramId });
      } else {
        pgram = GiveTransferService.program;
      }

      if (GiveTransferService.view === 'cc') {
        donationService.createCard();
        PaymentService.createDonorWithCard(donationService.card, GiveTransferService.email, GiveTransferService.donorFirstName, GiveTransferService.donorLastName)
          .then(function (donor) {
            donationService.donate(pgram, GiveTransferService.campaign);
          }, PaymentService.stripeErrorHandler);
      } else if (GiveTransferService.view === 'bank') {
        donationService.createBank();
        PaymentService.createDonorWithBankAcct(donationService.bank, GiveTransferService.email, GiveTransferService.donorFirstName, GiveTransferService.donorLastName)
          .then(function (donor) {
            donationService.donate(pgram, GiveTransferService.campaign);
          }, PaymentService.stripeErrorHandler);
      }
    }

    function createRecurringGift() {
      GiveTransferService.processing = true;

      if (GiveTransferService.view === 'cc') {
        donationService.createCard();
        PaymentService.createRecurringGiftWithCard(donationService.card)
          .then(function(recurringGift) {
            // TODO: Put recurringGift in GiveTransferService
            GiveTransferService.email = recurringGift.email;
            $state.go(GiveFlow.thankYou);
          }, PaymentService.stripeErrorHandler);
      } else if (GiveTransferService.view === 'bank') {
        donationService.createBank();
        PaymentService.createRecurringGiftWithBankAcct(donationService.bank)
          .then(function(recurringGift) {
            // TODO: Put recurringGift in GiveTransferService
            GiveTransferService.email = recurringGift.email;
            $state.go(GiveFlow.thankYou);
          }, PaymentService.stripeErrorHandler);
      }
    }

    function adminCreateRecurringGift(impersonateDonorId = null) {
      GiveTransferService.processing = true;

      if (GiveTransferService.view === 'cc') {
        donationService.createCard();
        return PaymentService.createRecurringGiftWithCard(donationService.card, impersonateDonorId);
      } else if (GiveTransferService.view === 'bank') {
        donationService.createBank();
        return PaymentService.createRecurringGiftWithBankAcct(donationService.bank, impersonateDonorId);
      }
    }

    function updateRecurringGift(accountInfoUpdated = false, impersonateDonorId = null) {
      GiveTransferService.processing = true;

      if (GiveTransferService.view === 'cc' && accountInfoUpdated) {
        donationService.createCard();
        return PaymentService.updateRecurringGiftWithCard(donationService.card, GiveTransferService.recurringGiftId, impersonateDonorId);
      } else if (GiveTransferService.view === 'bank' && accountInfoUpdated) {
        donationService.createBank();
        return PaymentService.updateRecurringGiftWithBankAcct(donationService.bank, GiveTransferService.recurringGiftId, impersonateDonorId);
      } else {
        return PaymentService.updateRecurringGiftDonorOnlyInformation(GiveTransferService.recurringGiftId, impersonateDonorId);
      }
    }

    function deleteRecurringGift(impersonateDonorId = null) {
      return PaymentService.deleteRecurringGift(GiveTransferService.recurringGiftId, impersonateDonorId);
    }

    function getRecurringGift(impersonateDonorId = null) {
      return PaymentService.getRecurringGift(GiveTransferService.recurringGiftId, impersonateDonorId);
    }

    function queryRecurringGifts(impersonateDonorId = null) {
      return PaymentService.queryRecurringGifts(impersonateDonorId);
    }

    function confirmDonation(programsInput, successful) {
      if (!Session.isActive()) {
        $state.go(GiveFlow.login);
      }

      GiveTransferService.processing = true;
      try {
        var pgram;
        if (programsInput) {
          pgram = _.find(programsInput, { ProgramId: GiveTransferService.program.ProgramId });
        } else {
          pgram = GiveTransferService.program;
        }

        donationService.donate(pgram, GiveTransferService.campaign, function(confirmation) {
          if (successful !== undefined) {
            successful(confirmation);
          }
          console.log('successfully donated');
        }, function(error) {

          if (GiveTransferService.declinedPayment) {
            GiveFlow.goToChange();
          }
        });
      } catch (DonationException) {
        GiveTransferService.processing = false;
        $rootScope.$emit('notify', $rootScope.MESSAGES.failedResponse);
      }
    }

    function donate(program, campaign, onSuccess, onFailure) {
      if (campaign === undefined || campaign ===  null) {
        campaign = { campaignId: null,  campaignName: null };
      }

      PaymentService.donateToProgram(
          program.ProgramId,
          campaign.campaignId,
          GiveTransferService.amount,
          GiveTransferService.donor.donorId,
          GiveTransferService.email,
          GiveTransferService.view,
          GiveTransferService.anonymous,
          GiveTransferService.tripDeposit).then(function(confirmation) {
            GiveTransferService.amount = confirmation.amount;
            GiveTransferService.program = program;
            GiveTransferService.program_name = GiveTransferService.program.Name;
            GiveTransferService.email = confirmation.email;
            if (onSuccess !== undefined) {
              onSuccess(confirmation);
            }

            $state.go(GiveFlow.thankYou);
          }, function(error) {

            GiveTransferService.processing = false;
            PaymentService.stripeErrorHandler(error);
            if (onSuccess !== undefined && onFailure !== undefined) {
              onFailure(error);
            }
          });
    }

    function processBankAccountChange(giveForm, programsInput) {
      if (giveForm.$valid) {
        GiveTransferService.processing = true;
        try {
        donationService.createBank();
        PaymentService.updateDonorWithBankAcct(GiveTransferService.donor.id,
                                               donationService.bank,
                                               GiveTransferService.email)
         .then(function(donor) {
           var pgram;
           if (programsInput !== undefined) {
             pgram = _.find(programsInput, { ProgramId: GiveTransferService.program.ProgramId });
           } else {
             pgram = GiveTransferService.program;
           }

           donationService.donate(pgram, GiveTransferService.campaign);
         }, PaymentService.stripeErrorHandler);
        } catch(err) {
          GiveTransferService.processing = false;
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        }
      } else {
        GiveTransferService.processing = false;
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
      }

    }

    function processChange() {
      if (!Session.isActive()) {
        $state.go(GiveFlow.login);
      }

      GiveTransferService.processingChange = true;
      GiveTransferService.amountSubmitted = false;
      $state.go(GiveFlow.amount);
    }

    function processCreditCardChange(giveForm, programsInput) {
      if (giveForm.$valid) {
        GiveTransferService.processing = true;
        GiveTransferService.declinedCard = false;
        try {
          donationService.createCard();
          var pgram;
          if (programsInput !== undefined) {
            pgram = _.find(programsInput, { ProgramId: GiveTransferService.program.ProgramId });
          } else {
            pgram = GiveTransferService.program;
          }

          PaymentService.updateDonorWithCard(GiveTransferService.donor.id,
                                             donationService.card,
                                             GiveTransferService.email)
            .then(function(donor) {
              donate(pgram, GiveTransferService.campaign, function() {

              },

               function(error) {
                GiveTransferService.processing = false;
                PaymentService.stripeErrorHandler(error);
              });
            },

            function(error) {
              GiveTransferService.processing = false;
              PaymentService.stripeErrorHandler(error);
            });
        } catch(err) {
          GiveTransferService.processing = false;
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        }
      } else {
        GiveTransferService.processing = false;
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
      }
    }

    function submitBankInfo(giveForm, programsInput) {
      GiveTransferService.bankinfoSubmitted = true;
      if (giveForm.accountForm.$valid) {
        GiveTransferService.processing = true;
        PaymentService.getDonor(GiveTransferService.email)
          .then(function(donor) {
            donationService.updateDonorAndDonate(donor.id, programsInput);
          },

          function(error) {
            donationService.createDonorAndDonate(programsInput);
          });
      } else {
        GiveTransferService.processing = false;
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
      }
    }

    function submitChangedBankInfo(giveForm, programsInput) {

      var pgram = (programsInput !== undefined) ?
        _.find(programsInput, { ProgramId: GiveTransferService.program.ProgramId }) :
        GiveTransferService.program;

      if (!Session.isActive()) {
        $state.go(GiveFlow.login);
      }

      GiveTransferService.bankinfoSubmitted = true;

      if (GiveTransferService.amount === '') {
        GiveTransferService.processing = false;
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
      } else {
        if (GiveTransferService.view === 'cc') {
          if (GiveTransferService.savedPayment === 'bank') {
            giveForm.creditCardForm.$setDirty();
          }

          if (!giveForm.creditCardForm.$dirty) {
            GiveTransferService.processing = true;
            donationService.donate(pgram, GiveTransferService.campaign);
          } else {
            donationService.processCreditCardChange(giveForm, programsInput);
          }
        } else if (GiveTransferService.view === 'bank') {
          if (GiveTransferService.savedPayment === 'cc') {
            giveForm.bankAccountForm.$setDirty();
          }

          if (!giveForm.bankAccountForm.$dirty) {
            GiveTransferService.processing = true;
            donationService.donate(pgram, GiveTransferService.campaign);
          } else {
            donationService.processBankAccountChange(giveForm, programsInput);
          }
        }
      }
    }

    function transitionForLoggedInUserBasedOnExistingDonor(event, toState) {
      var deferred = $q.defer();
      if (toState.name === GiveFlow.account && Session.isActive() && !GiveTransferService.donorError) {
        GiveTransferService.processing = true;
        event.preventDefault();
        PaymentService.getDonor(GiveTransferService.email)
        .then(function(donor) {
          GiveTransferService.donor = donor;
          if (GiveTransferService.donor.default_source.credit_card.last4 != null) {
            GiveTransferService.last4 = donor.default_source.credit_card.last4;
            GiveTransferService.brand = CC_BRAND_CODES[donor.default_source.credit_card.brand];
            GiveTransferService.view = 'cc';
          } else {
            GiveTransferService.accountHolderName = donor.default_source.bank_account.accountHolderName;
            GiveTransferService.accountHolderType = donor.default_source.bank_account.accountHolderType;
            GiveTransferService.last4 = donor.default_source.bank_account.last4;
            GiveTransferService.brand = '#library';
            GiveTransferService.view = 'bank';
          }
          $state.go(GiveFlow.confirm);
          deferred.resolve();
        },

        function(error) {
          // Go forward to account info if it was a 404 "not found" error,
          // the donor service returns a 404 when a donor doesn't exist
          if (error && error.httpStatusCode === 404) {
            GiveTransferService.donorError = true;
            $state.go(GiveFlow.account);
            deferred.resolve();
          } else {
            PaymentService.stripeErrorHandler(error);
            deferred.reject();
          }
        });
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function updateDonorAndDonate(donorId, programsInput) {
      // The vm.email below is only required for guest giver, however, there
      // is no harm in sending it for an authenticated user as well,
      // so we'll keep it simple and send it in all cases.
      var pgram;
      if (programsInput !== undefined) {
        pgram = _.find(programsInput, { ProgramId: GiveTransferService.program.ProgramId });
      } else {
        pgram = GiveTransferService.program;
      }

      if (GiveTransferService.view === 'cc') {
        donationService.createCard();
        PaymentService.updateDonorWithCard(donorId, donationService.card, GiveTransferService.email)
          .then(function(donor) {
            donationService.donate(pgram, GiveTransferService.campaign);
          }, PaymentService.stripeErrorHandler);
      } else if (GiveTransferService.view === 'bank') {
        donationService.createBank();
        PaymentService.updateDonorWithBankAcct(donorId, donationService.bank, GiveTransferService.email)
          .then(function(donor) {
            donationService.donate(pgram, GiveTransferService.campaign);
          }, PaymentService.stripeErrorHandler);
      }
    }

    return donationService;
  }
})();
