'use strict';

var moment = require('moment');

(function() {

  module.exports = KidsClubAdultApplicationController;

  KidsClubAdultApplicationController.$inject = ['$rootScope', '$log', 'VolunteerService', 'adultFields', 'Lookup'];

  function KidsClubAdultApplicationController($rootScope, $log, VolunteerService, adultFields, Lookup) {
    $log.debug('Inside Kids-Club-Adult-Application-Controller');
    var vm = this;

    if (vm.volunteer === undefined) {
      vm.volunteer = {};
    }

    vm.availabilitySelected = availabilitySelected;
    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      showWeeks: 'false'
    };
    vm.datePickers = { childDob1 : false, childDob2: false, signatureDate: false };
    vm.format = 'MM/dd/yyyy';
    vm.gradeLevelSelected = gradeLevelSelected;
    vm.maritalStatuses = [];
    vm.open = open;
    vm.phoneFormat = /^\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/;
    vm.religionSelected = religionSelected;
    vm.save = save;
    vm.saving = false;
    vm.showError = showError;
    vm.spiritualSelected = spiritualSelected;
    vm.submitButtonText = 'Submit';
    vm.volunteer.child1 = {};
    vm.volunteer.child2 = {};
    vm.volunteer.child3 = {};
    vm.volunteer.child4 = {};
    vm.volunteer.signatureDate = moment().format('MM/DD/YYYY');

    maritalStatuses();

    ///////////////////////////////////////////////////

    /**
     * Checks if one of the availabilities has been selected and returns
     * true if it has, false otherwise
     */
    function availabilitySelected(){
      if (vm.volunteer.availabilityWeek || vm.volunteer.availabilityWeekend)
        return true;
      return false;
    }

    /**
     * Checks if one of the grade levels has been selected and
     * returns true if has, false otherwise
     */
    function gradeLevelSelected(){
      if (vm.volunteer.birthToTwo ||
          vm.volunteer.threeToPreK ||
          vm.volunteer.kToFifth)
        return true;
      return false;
    }

    function maritalStatuses() {
      Lookup.query({
          table: 'maritalstatus'
      }).$promise
      .then(function(response) {
        vm.maritalStatuses = response;
      });
    }

    /**
     * Open the date picker for the passed in field
     */
    function open(field, $event) {
      if($event !== null){
        $event.preventDefault();
        $event.stopPropagation();
      }
      vm.datePickers[field] = true;
    }

    /**
     * Attempt to save the form response
     */
    function save(form) {
      vm.saving = true;
      vm.submitButtonText = 'Submitting...';

      $log.debug('you tried to save');
      $log.debug('nameTag: ' + vm.volunteer.nameTag);
      $log.debug('something from parent: ' + vm.volunteer.contactId);

      $log.debug('saving');
      if(form.adult.$invalid){
        $log.error('please fill out all required fields correctly');
        $rootScope.$emit('notify',$rootScope.MESSAGES.generalError);
        vm.saving = false;
        vm.submitButtonText = 'Submit';
        return false;
      }

      var adult = new VolunteerService.SaveAdult();
      adult.contactId = vm.contactId;
      adult.opportunityId = vm.opportunityId;
      adult.responseOpportunityId = vm.responseId;

      adult.firstName = {
        Value: vm.volunteer.firstName,
        CrossroadsId: adultFields.firstName
      };

      adult.lastName = {
        Value: vm.volunteer.lastName,
        CrossroadsId: adultFields.lastName
      };

      adult.middleInitial = {
        Value: vm.volunteer.middleInitial,
        CrossroadsId: adultFields.middleInitial
      };

      adult.previousName = {
        Value: vm.volunteer.previousName,
        CrossroadsId: adultFields.previousName
      };

      adult.email = {
        Value: vm.volunteer.emailAddress,
        CrossroadsId: adultFields.email
      };

      adult.nameForNameTag = {
        Value: vm.volunteer.nickName,
        CrossroadsId: adultFields.nameForNameTag
      };

      adult.birthDate = {
        Value: vm.volunteer.dateOfBirth,
        CrossroadsId: adultFields.birthDate
      };

      adult.gender = {
        Value: vm.volunteer.genderId,
        CrossroadsId: adultFields.gender
      };

      adult.maritalStatus = {
        Value: vm.volunteer.maritalStatusId,
        CrossroadsId: adultFields.maritalStatus
      };

      adult.spouseName = {
        Value: vm.volunteer.spouseName,
        CrossroadsId: adultFields.spouseName
      };

      adult.spouseGender = {
        Value: vm.volunteer.spouseGender,
        CrossroadsId: adultFields.spouseGender
      };

      adult.howLongAttending = {
        Value: vm.volunteer.attending,
        CrossroadsId: adultFields.howLongAttending
      };

      adult.serviceAttend = {
        Value: vm.volunteer.serviceAttend,
        CrossroadsId: adultFields.serviceAttend
      };

      adult.streetAddress = {
        Value: vm.volunteer.addressLine1,
        CrossroadsId: adultFields.streetAddress
      };

      adult.city = {
        Value: vm.volunteer.city,
        CrossroadsId: adultFields.city
      };

      adult.state = {
        Value: vm.volunteer.state,
        CrossroadsId: adultFields.state
      };

      adult.zip = {
        Value: vm.volunteer.postalCode,
        CrossroadsId: adultFields.zip
      };

      adult.mobilePhone = {
        Value: vm.volunteer.mobilePhone,
        CrossroadsId: adultFields.mobilePhone
      };

      adult.homePhone = {
        Value: vm.volunteer.homePhone,
        CrossroadsId: adultFields.homePhone
      };

      adult.companyName = {
        Value: vm.volunteer.company,
        CrossroadsId: adultFields.companyName
      };

      adult.position = {
        Value: vm.volunteer.position,
        CrossroadsId: adultFields.position
      };

      adult.workPhone = {
        Value: vm.volunteer.workPhone,
        CrossroadsId: adultFields.workPhone
      };

      adult.child1Name = {
        Value: vm.volunteer.child1.name,
        CrossroadsId: adultFields.child1Name
      };

      adult.child1Birthdate = {
        Value: vm.volunteer.child1.dob,
        CrossroadsId: adultFields.child1Birthdate
      };

      adult.child2Name = {
        Value: vm.volunteer.child2.name,
        CrossroadsId: adultFields.child2Name
      };

      adult.child2Birthdate = {
        Value: vm.volunteer.child2.dob,
        CrossroadsId: adultFields.child2Birthdate
      };

      adult.child3Name = {
        Value: vm.volunteer.child3.name,
        CrossroadsId: adultFields.child3Name
      };

      adult.child3Birthdate = {
        Value: vm.volunteer.child3.dob,
        CrossroadsId: adultFields.child3Birthdate
      };

      adult.child4Name = {
        Value: vm.volunteer.child4.name,
        CrossroadsId: adultFields.child4Name
      };

      adult.child4Birthdate = {
        Value: vm.volunteer.child4.dob,
        CrossroadsId: adultFields.child4Birthdate
      };

      adult.everBeenArrest = {
        Value: vm.volunteer.crime,
        CrossroadsId: adultFields.everBeenArrest
      };

      adult.addictionConcern = {
        Value: vm.volunteer.addiction,
        CrossroadsId: adultFields.addictionConcern
      };

      adult.neglectingChild = {
        Value: vm.volunteer.neglect,
        CrossroadsId: adultFields.neglectingChild
      };

      adult.psychiatricDisorder = {
        Value: vm.volunteer.psychiatricDisorder,
        CrossroadsId: adultFields.psychiatricDisorder
      };

      adult.sexuallyActiveOutsideMarriage = {
        Value: vm.volunteer.sexualyActive,
        CrossroadsId: adultFields.sexuallyActiveOutsideMarriage
      };

      adult.religionSearchingForAnswers = {
        Value: vm.volunteer.religionSearchingForAnswers,
        CrossroadsId: adultFields.religionSearchingForAnswers
      };

      adult.religionReceivedJesus = {
        Value: vm.volunteer.religionReceivedJesus,
        CrossroadsId: adultFields.religionReceivedJesus
      };

      adult.religionFocusingOnObedience = {
        Value: vm.volunteer.religionFocusingOnObedience,
        CrossroadsId: adultFields.religionFocusingOnObedience
      };

      adult.religionReplicating = {
        Value: vm.volunteer.religionReplicating,
        CrossroadsId: adultFields.religionReplicating
      };

      adult.spiritualOrientationExplain = {
        Value: vm.volunteer.explainFaith,
        CrossroadsId: adultFields.spiritualOrientationExplain
      };

      adult.whatPromptedApplication = {
        Value: vm.volunteer.whatPromptedApplication,
        CrossroadsId: adultFields.whatPromptedApplication
      };

      adult.specialTalents = {
        Value: vm.volunteer.specialTalents,
        CrossroadsId: adultFields.specialTalents
      };

      adult.availabilityWeek = {
        Value: vm.volunteer.availabilityWeek,
        CrossroadsId: adultFields.availabilityWeek
      };

      adult.availabilityWeekend = {
        Value: vm.volunteer.availabilityWeekend,
        CrossroadsId: adultFields.availabilityWeekend
      };

      adult.availabilityWeekendSite = {
        Value: vm.volunteer.availabilityWeekendSite,
        CrossroadsId: adultFields.availabilityWeekendSite
      };

      adult.areaOfInterestServingInClassroom = {
        Value: vm.volunteer.areaOfInterestServingInClassroom,
        CrossroadsId: adultFields.areaOfInterestServingInClassroom
      };

      adult.areaOfInterestWelcomingNewFamilies = {
        Value: vm.volunteer.areaOfInterestWelcomingNewFamilies,
        CrossroadsId: adultFields.areaOfInterestWelcomingNewFamilies
      };

      adult.areaOfInterestHelpSpecialNeeds = {
        Value: vm.volunteer.areaOfInterestHelpSpecialNeeds,
        CrossroadsId: adultFields.areaOfInterestHelpSpecialNeeds
      };

      adult.areaOfInterestTech = {
        Value: vm.volunteer.areaOfInterestTech,
        CrossroadsId: adultFields.areaOfInterestTech
      };

      adult.areaOfInterestRoomPrep = {
        Value: vm.volunteer.areaOfInterestRoomPrep,
        CrossroadsId: adultFields.areaOfInterestRoomPrep
      };

      adult.areaOfInterestAdminTasks = {
        Value: vm.volunteer.areaOfInterestAdminTasks,
        CrossroadsId: adultFields.areaOfInterestAdminTasks
      };

      adult.areaOfInterestShoppingForSupplies = {
        Value: vm.volunteer.areaOfInterestShoppingForSupplies,
        CrossroadsId: adultFields.areaOfInterestShoppingForSupplies
      };

      adult.areaOfInterestCreatingWeekendExperience = {
        Value: vm.volunteer.areaOfInterestCreatingWeekendExperience,
        CrossroadsId: adultFields.areaOfInterestCreatingWeekendExperience
      };

      adult.whatAgeBirthToTwo = {
        Value: vm.volunteer.birthToTwo,
        CrossroadsId: adultFields.whatAgeBirthToTwo
      };

      adult.whatAgeThreeToPreK = {
        Value: vm.volunteer.threeToPreK,
        CrossroadsId: adultFields.whatAgeThreeToPreK
      };

      adult.whatAgeKToFifth = {
        Value: vm.volunteer.kToFifth,
        CrossroadsId: adultFields.whatAgeKToFifth
      };

      // reference 1
      adult.reference1Name = {
        Value: vm.volunteer.referenceName1,
        CrossroadsId: adultFields.reference1Name
      };

      adult.reference1timeKnown = {
        Value: vm.volunteer.referenceTimeKnown1,
        CrossroadsId: adultFields.reference1timeKnown
      };

      adult.reference1homePhone = {
        Value: vm.volunteer.referenceHomePhone1,
        CrossroadsId: adultFields.reference1homePhone
      };

      adult.reference1mobilePhone = {
        Value: vm.volunteer.referenceMobilePhone1,
        CrossroadsId: adultFields.reference1mobilePhone
      };

      adult.reference1workPhone = {
        Value: vm.volunteer.referenceWorkPhone1,
        CrossroadsId: adultFields.reference1workPhone
      };

      adult.reference1email = {
        Value: vm.volunteer.referenceEmail1,
        CrossroadsId: adultFields.reference1email
      };

      adult.reference1association = {
        Value: vm.volunteer.referenceAssociation1,
        CrossroadsId: adultFields.reference1association
      };

      adult.reference1occupation = {
        Value: vm.volunteer.referenceOccupation1,
        CrossroadsId: adultFields.reference1occupation
      };

      // reference 2
      adult.reference2Name = {
        Value: vm.volunteer.referenceName2,
        CrossroadsId: adultFields.reference2Name
      };

      adult.reference2timeKnown = {
        Value: vm.volunteer.referenceTimeKnown2,
        CrossroadsId: adultFields.reference2timeKnown
      };

      adult.reference2homePhone = {
        Value: vm.volunteer.referenceHomePhone2,
        CrossroadsId: adultFields.reference2homePhone
      };

      adult.reference2mobilePhone = {
        Value: vm.volunteer.referenceMobilePhone2,
        CrossroadsId: adultFields.reference2mobilePhone
      };

      adult.reference2workPhone = {
        Value: vm.volunteer.referenceWorkPhone2,
        CrossroadsId: adultFields.reference2workPhone
      };

      adult.reference2email = {
        Value: vm.volunteer.referenceEmail2,
        CrossroadsId: adultFields.reference2email
      };

      adult.reference2association = {
        Value: vm.volunteer.referenceAssociation2,
        CrossroadsId: adultFields.reference2association
      };

      adult.reference2occupation = {
        Value: vm.volunteer.referenceOccupation2,
        CrossroadsId: adultFields.reference2occupation
      };

      // reference 3
      adult.reference3Name = {
        Value: vm.volunteer.referenceName3,
        CrossroadsId: adultFields.reference3Name
      };

      adult.reference3timeKnown = {
        Value: vm.volunteer.referenceTimeKnown3,
        CrossroadsId: adultFields.reference3timeKnown
      };

      adult.reference3homePhone = {
        Value: vm.volunteer.referenceHomePhone3,
        CrossroadsId: adultFields.reference3homePhone
      };

      adult.reference3mobilePhone = {
        Value: vm.volunteer.referenceMobilePhone3,
        CrossroadsId: adultFields.reference3mobilePhone
      };

      adult.reference3workPhone = {
        Value: vm.volunteer.referenceWorkPhone3,
        CrossroadsId: adultFields.reference3workPhone
      };

      adult.reference3email = {
        Value: vm.volunteer.referenceEmail3,
        CrossroadsId: adultFields.reference3email
      };

      adult.reference3association = {
        Value: vm.volunteer.referenceAssociation3,
        CrossroadsId: adultFields.reference3association
      };

      adult.reference3occupation = {
        Value: vm.volunteer.referenceOccupation3,
        CrossroadsId: adultFields.reference3occupation
      };

      adult.agree = {
        Value: vm.volunteer.signatureAgree,
        CrossroadsId: adultFields.agree
      };

      adult.agreeDate = {
        Value: vm.volunteer.signatureDate,
        CrossroadsId: adultFields.agreeDate
      };

      adult.$save(function(saved) {
        vm.saving = false;
        vm.submitButtonText = 'Submit';
        vm.showSuccess = true;
        return true;
      }, function(err) {
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        vm.saving = false;
        vm.submitButtonText = 'Submit';
        return false;
      });

    }

    function showError(form, field) {
      if(form[field] === undefined)
        return false;
      if (form.$submitted || form[field].$dirty){
        return form[field].$invalid;
      }
      return false;
    }

    /**
     * Checks if one of the spiritual life responses has been selected and returns
     * true if it has, false otherwise
     */
    function spiritualSelected(){
      if (vm.volunteer.religionSearchingForAnswers ||
          vm.volunteer.religionReceivedJesus ||
          vm.volunteer.religionFocusingOnObedience ||
          vm.volunteer.religionReplicating) {
        return true;
      }
      return false;
    }

    /**
     * Checks if one of the a religion options has been selected and returns
     * true if it has, false otherwise
     */
    function religionSelected(){
      if (vm.volunteer.exploring || vm.volunteer.unsure || vm.volunteer.christ)
        return true;
      return false;
    }

  }
})();
