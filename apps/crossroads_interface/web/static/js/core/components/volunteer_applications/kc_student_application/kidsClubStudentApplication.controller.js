var moment = require('moment');

(function() {

  'use strict';
  module.exports = KidsClubStudentApplicationController;

  KidsClubStudentApplicationController.$inject = ['$log', '$rootScope', 'VolunteerService', 'studentFields'];

  function KidsClubStudentApplicationController($log, $rootScope, VolunteerService, studentFields) {
    $log.debug('Inside Kids-Club-Student-Application-Controller');
    var vm = this;

    vm.availabilitySelected = availabilitySelected;
    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      showWeeks: 'false'
    };
    vm.gradeLevelSelected = gradeLevelSelected;
    vm.parentSignatureDate = moment().format('MM/DD/YYYY');
    vm.phoneFormat = /^\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/;
    vm.reference1 = {};
    vm.reference2 = {};
    vm.save = save;
    vm.saving = false;
    vm.serveAgeKids = {};
    vm.showError = showError;
    vm.spiritualSelected = spiritualSelected;
    vm.studentSignatureDate = moment().format('MM/DD/YYYY');
    vm.submitButtonText = 'Submit';

    activate();

    ///////////////////////////////////////////

    function activate() { }

    /**
     * Checks if one of the availabilities has been selected and returns
     * true if it has, false otherwise
     */
    function availabilitySelected(){
      if (vm.availabilityDuringWeek || vm.availabilityDuringWeekend) {
        return true;
      }
      return false;
    }

    /**
     * Checks if one of the grade levels has been selected and
     * returns true if has, false otherwise
     */
    function gradeLevelSelected(){
      if (vm.serveAgeKids && (
          vm.serveAgeKids.age1to2 ||
          vm.serveAgeKids.age3toPreK ||
          vm.serveAgeKids.Kto5Grade)
        ) {
        return true;
      }
      return false;
    }

    // Passing in the form object to determine if the
    // form is valid. Is there a better way to do this?
    function save(form) {
      // set the state of the save button to saving...
      vm.saving = true;
      vm.submitButtonText = 'Submitting...';

      $log.debug('you tried to save');
      $log.debug('school: ' + vm.school);
      $log.debug('something from parent: ' + vm.contactId );

      if(form.student.$invalid){
        $log.error('please fill out all required fields correctly');
        $rootScope.$emit('notify',$rootScope.MESSAGES.generalError);
        vm.saving = false;
        vm.submitButtonText = 'Submit';
        return false;
      }

      var student = new VolunteerService.SaveStudent();
      student.contactId = vm.contactId;
      student.opportunityId = vm.pageInfo.opportunity;
      student.responseOpportunityId = vm.responseId;

      student.firstName = {
        Value: vm.volunteer.firstName,
        CrossroadsId: studentFields.firstName
      };

      student.lastName = {
        Value:vm.volunteer.lastName,
        CrossroadsId: studentFields.lastName
      };

      student.middleInitial = {
        Value: vm.volunteer.middleInitial,
        CrossroadsId: studentFields.middleInitial
      };

      student.email = {
        Value: vm.volunteer.emailAddress,
        CrossroadsId: studentFields.email
      };

      student.nameForNameTag = {
        Value: vm.volunteer.nickName,
        CrossroadsId: studentFields.nameForNameTag
      };

      student.birthDate = {
        Value: vm.volunteer.dateOfBirth,
        CrossroadsId: studentFields.birthDate
      };

      student.gender = {
        Value: vm.volunteer.genderId,
        CrossroadsId: studentFields.gender
      };

      student.howLongAttending = {
        Value: vm.howLongAttending,
        CrossroadsId: studentFields.howLongAttending
      };

      student.serviceAttend = {
        Value: vm.serviceAttend,
        CrossroadsId: studentFields.serviceAttend
      };

      student.streetAddress = {
        Value: vm.volunteer.addressLine1,
        CrossroadsId: studentFields.streetAddress
      };

      student.city = {
        Value: vm.volunteer.city,
        CrossroadsId: studentFields.city
      };

      student.state = {
        Value: vm.volunteer.state,
        CrossroadsId: studentFields.state
      };

      student.zip = {
        Value: vm.volunteer.postalCode,
        CrossroadsId: studentFields.zip
      };

      student.mobilePhone = {
        Value: vm.volunteer.mobilePhone,
        CrossroadsId: studentFields.mobilePhone
      };

      student.homePhone = {
        Value: vm.volunteer.homePhone,
        CrossroadsId: studentFields.homePhone
      };

      student.school = {
        Value: vm.school,
        CrossroadsId: studentFields.school
      };

      student.grade = {
        Value: vm.grade,
        CrossroadsId: studentFields.grade
      };

      student.religionSearchingForAnswers = {
        Value: vm.religionSearchingForAnswers,
        CrossroadsId: studentFields.religionSearchingForAnswers
      };

      student.religionReceivedJesus = {
        Value: vm.religionReceivedJesus,
        CrossroadsId: studentFields.religionReceivedJesus
      };

      student.religionFocusingOnObedience = {
        Value: vm.religionFocusingOnObedience,
        CrossroadsId: studentFields.religionFocusingOnObedience
      };

      student.religionReplicating = {
        Value: vm.religionReplicating,
        CrossroadsId: studentFields.religionReplicating
      };

      student.explainFaith = {
        Value: vm.explainFaith,
        CrossroadsId: studentFields.explainFaith
      };

      student.whyServe = {
        Value: vm.whyServe,
        CrossroadsId: studentFields.whyServe
      };

      student.specialTalents = {
        Value: vm.specialTalents,
        CrossroadsId: studentFields.specialTalents
      };

      student.availabilityDuringWeek = {
        Value: vm.availabilityDuringWeek,
        CrossroadsId: studentFields.availabilityDuringWeek
      };

      student.availabilityDuringWeekend = {
        Value: vm.availabilityDuringWeekend,
        CrossroadsId: studentFields.availabilityDuringWeekend
      };

      student.availabilityWeekendSite = {
        Value: vm.availabilityWeekendSite,
        CrossroadsId: studentFields.availabilityWeekendSite
      };

      student.serveAgeKids1to2 = {
        Value: vm.serveAgeKids.age1to2,
        CrossroadsId: studentFields.serveAgeKids1to2
      };

      student.serveAgeKids3toPreK = {
        Value: vm.serveAgeKids.age3toPreK,
        CrossroadsId: studentFields.serveAgeKids3toPreK
      };

      student.serveAgeKidsKto5Grade = {
        Value: vm.serveAgeKids.Kto5Grade,
        CrossroadsId: studentFields.serveAgeKidsKto5Grade
      };

      // reference 1
      student.reference1Name = {
        Value: vm.reference1.name,
        CrossroadsId: studentFields.reference1Name
      };

      student.reference1timeKnown = {
        Value: vm.reference1.timeKnown,
        CrossroadsId: studentFields.reference1timeKnown
      };

      student.reference1homePhone = {
        Value: vm.reference1.homePhone,
        CrossroadsId: studentFields.reference1homePhone
      };

      student.reference1mobilePhone = {
        Value: vm.reference1.mobilePhone,
        CrossroadsId: studentFields.reference1mobilePhone
      };

      student.reference1workPhone = {
        Value: vm.reference1.workPhone,
        CrossroadsId: studentFields.reference1workPhone
      };

      student.reference1email = {
        Value: vm.reference1.email,
        CrossroadsId: studentFields.reference1email
      };

      student.reference1association = {
        Value: vm.reference1.association,
        CrossroadsId: studentFields.reference1association
      };

      student.reference1occupation = {
        Value: vm.reference1.occupation,
        CrossroadsId: studentFields.reference1occupation
      };

      // reference 2
      student.reference2Name = {
        Value: vm.reference2.name,
        CrossroadsId: studentFields.reference2Name
      };

      student.reference2timeKnown = {
        Value: vm.reference2.timeKnown,
        CrossroadsId: studentFields.reference2timeKnown
      };

      student.reference2homePhone = {
        Value: vm.reference2.homePhone,
        CrossroadsId: studentFields.reference2homePhone
      };

      student.reference2mobilePhone = {
        Value: vm.reference2.mobilePhone,
        CrossroadsId: studentFields.reference2mobilePhone
      };

      student.reference2workPhone = {
        Value: vm.reference2.workPhone,
        CrossroadsId: studentFields.reference2workPhone
      };

      student.reference2email = {
        Value: vm.reference2.email,
        CrossroadsId: studentFields.reference2email
      };

      student.reference2association = {
        Value: vm.reference2.association,
        CrossroadsId: studentFields.reference2association
      };

      student.reference2occupation = {
        Value: vm.reference2.occupation,
        CrossroadsId: studentFields.reference2occupation
      };

      student.parentLastName = {
        Value: vm.parent.lastName,
        CrossroadsId: studentFields.parentLastName
      };

      student.parentFirstName = {
        Value: vm.parent.firstName,
        CrossroadsId: studentFields.parentFirstName
      };

      student.parentHomePhone = {
        Value: vm.parent.homePhone,
        CrossroadsId: studentFields.parentHomePhone
      };

      student.parentMobilePhone = {
        Value: vm.parent.mobilePhone,
        CrossroadsId: studentFields.parentMobilePhone
      };

      student.parentEmail = {
        Value: vm.parent.email,
        CrossroadsId: studentFields.parentEmail
      };

      student.parentSignature = {
        Value: vm.parentSignature,
        CrossroadsId: studentFields.parentSignature
      };

      student.parentSignatureDate = {
        Value: vm.parentSignatureDate,
        CrossroadsId: studentFields.parentSignatureDate
      };

      student.studentSignature = {
        Value: vm.studentSignature,
        CrossroadsId: studentFields.studentSignature
      };

      student.studentSignatureDate = {
        Value: vm.studentSignatureDate,
        CrossroadsId: studentFields.studentSignatureDate
      };

      student.$save(function(saved) {
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
      return true;
    }

    function showError(form, field) {
      if(form[field] === undefined) {
        return false;
      }
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
      if (vm.religionSearchingForAnswers ||
          vm.religionReceivedJesus ||
          vm.religionFocusingOnObedience ||
          vm.religionReplicating) {
        return true;
      }
      return false;
    }

  }
})();
