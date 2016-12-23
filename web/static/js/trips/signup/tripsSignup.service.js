(function() {
  'use strict';

  module.exports = TripsSignupService;

  TripsSignupService.$inject = ['$resource', '$location', '$log', '$stateParams'];

  function TripsSignupService($resource, $location, $log, $stateParams) {
    var signupService = {
      activate: activate,
      pages: [],
      reset: reset,
      TripApplication: $resource(__API_ENDPOINT__ + 'api/trip-application'),
      CreateTripParticipant: $resource(__API_ENDPOINT__+ 'api/trip-participant'),
      CampaignInfo: $resource(__API_ENDPOINT__ + 'api/trip-application/:contactId/:campaignId'),
      donorId: null,
      programId: null,
      programName: null,
      pledgeAmount: null,
      depositAmount: null,
      progressLabel: null,
      applicationValid: false,
      isScholarshipped: false,
      saveApplication: saveApplication,
      isTripfull: false,
      paymentMethod: ''
    };

    function activate() {
      $log.debug('signup service activate');

      if (signupService.page2 === undefined) {
        signupService.page2 = page2();
      }

      if (signupService.page3 === undefined) {
        signupService.page3 = page3();
      }

      if (signupService.page4 === undefined) {
        signupService.page4 = page4();
      }

      if (signupService.page5 === undefined) {
        signupService.page5 = page5();
      }

      if (signupService.page6 === undefined) {
        signupService.page6 = page6();
      }

      if (signupService.depositInfo === undefined) {
        signupService.depositInfo = depositInfo();
      }

    }

    function reset(campaign, currentPage = 1) {
      signupService.campaign = campaign;
      signupService.ageLimitReached = false;
      signupService.contactId = '';
      signupService.currentPage = currentPage;
      signupService.pageHasErrors = true;
      signupService.privateInvite = $location.search().invite;

      signupService.page2 = page2();
      signupService.page3 = page3();
      signupService.page4 = page4();
      signupService.page5 = page5();
      signupService.page6 = page6();
      signupService.depositInfo = depositInfo();

      signupService.spiritualLifeShown = false;
    }

    function depositInfo() {
      return {
        donationAmount: null,
        donationDate: null,
        paymentMethod: null
      };
    }

    function page2() {
      return {
        guardianFirstName: null,
        guardianLastName: null,
        referral: null,
        conditions: null,
        why: null,
      };
    }

    function page3() {
      return {
        emergencyContactFirstName: null,
        emergencyContactLastName: null,
        emergencyContactEmail: null,
        emergencyContactPrimaryPhone: null,
        emergencyContactSecondaryPhone: null,
        emergencyContactRelationship: null
      };
    }

    function page4() {
      return {
        groupCommonName: null,
        roommateFirstChoice: null,
        roommateSecondChoice: null,
        supportPersonEmail: null,
        interestedInGroupLeader: null,
        whyGroupLeader: null,
      };
    }

    function page5() {
      return {
        sponsorChildInNicaragua: null,
        sponsorChildFirstName: null,
        sponsorChildLastName: null,
        sponsorChildNumber: null,
        sponsorChildTown: null,
        nolaFirstChoiceWorkTeam: null,
        nolaFirstChoiceExperience: null,
        nolaSecondChoiceWorkTeam: null,
      };
    }

    function page6() {
      return {
        experienceAbroad: null,
        describeExperienceAbroad: null,
        pastAbuseHistory: null,
        validPassport: null
      };
    }

    function saveApplication(success, error) {
      var application = new signupService.TripApplication();
      application.contactId = signupService.person.contactId;
      application.pledgeCampaignId = signupService.campaign.id;
      application.pageTwo = signupService.page2;
      application.pageThree = signupService.page3;
      application.pageFour = signupService.page4;
      application.pageFive = signupService.page5;
      application.pageSix = signupService.page6;
      application.inviteGUID = $stateParams.invite;
      application.depositInformation = signupService.depositInfo;
      application.depositInformation.donationAmount = signupService.depositAmount;
      application.depositInformation.donationDate = moment(new Date()).format('l');
      application.depositInformation.paymentMethod = this.paymentMethod;

      /*jshint unused:false */
      application.$save((data) => {
          _.each(signupService.familyMembers, (f) => {
            if (f.contactId === Number($stateParams.contactId)) {
              f.signedUp = true;
              f.signedUpDate = new Date();
            }
          });
          signupService.reset(signupService.campaign, 'thanks');
          success(data);
        }, (err) => {
          error(err);
      });
    }

    return signupService;
  }
})();
