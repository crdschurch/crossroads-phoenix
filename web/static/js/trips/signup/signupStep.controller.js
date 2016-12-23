var attributeTypes = require('crds-constants').ATTRIBUTE_TYPE_IDS;
var attributes = require('crds-constants').ATTRIBUTE_IDS;
(function() {
  'use strict';

  module.exports = SignupStepController;

  SignupStepController.$inject = [
    '$stateParams',
    'TripsSignupService',
    'AttributeTypeService',
    '$scope',

    // For the dropdowns
    'WorkTeams',
    'TshirtSizes',
    'InternationalExperience',
    'AbuseHistory',
    'Locations'
  ];

  function SignupStepController(
    $stateParams,
    TripsSignupService,
    AttributeTypeService,
    $scope,
    WorkTeams,
    TshirtSizes,
    InternationalExperience,
    AbuseHistory,
    Locations) {

    var vm = this;

    vm.signupService = $scope.$parent.tripsSignup.signupService;
    vm.abuseHistory = vm.signupService.person.singleAttributes[attributeTypes.ABUSE_HISTORY];
    vm.abuseOptions = AbuseHistory;
    vm.allergies = vm.signupService.person.singleAttributes[attributeTypes.ALLERGIES];
    vm.dietaryRestrictions = vm.signupService.person.attributeTypes[attributeTypes.DIETARY_RESTRICTIONS].attributes;
    vm.experienceAbroad = vm.signupService.person.singleAttributes[attributeTypes.EXPERIENCE_ABROAD];
    vm.frequentFlyers = vm.signupService.person.attributeTypes[attributeTypes.FREQUENT_FLYERS].attributes;
    vm.internationalExpSelected = vm.signupService.person.singleAttributes[attributeTypes.INTERNATIONAL_EXPERIENCE];
    vm.interExperience = InternationalExperience;
    vm.locations = Locations;
    vm.medicalRestrictions = vm.signupService.person.singleAttributes[attributeTypes.MEDICAL_RESTRICTIONS];
    vm.medicationsTaking = vm.signupService.person.singleAttributes[attributeTypes.MEDICATION_TAKING];
    vm.person = vm.signupService.person;
    vm.passportValid = _.isEmpty(vm.signupService.person.passportNumber) ? '' : 'true';
    vm.spiritualLife = vm.signupService.person.attributeTypes[attributeTypes.SPIRITUAL_JOURNEY].attributes;
    vm.step = $stateParams.stepId;
    vm.tripExperience = vm.signupService.person.singleAttributes[attributeTypes.TRIP_EXPERIENCE];
    vm.tripSkills = vm.signupService.person.attributeTypes[attributeTypes.TRIP_SKILLS].attributes;
    vm.tshirt = vm.signupService.person.singleAttributes[attributeTypes.TSHIRT_SIZES];
    vm.tshirtSizes = TshirtSizes;
    vm.workTeams = WorkTeams;

    vm.signupService.pageId = $stateParams.stepId;
    vm.signupService.pages[$stateParams.stepId] = {dirty: false};

    activate();

    //////////////////////////////
    function activate() {
      switch (vm.signupService.pageId) {
        case '2':
          evaluateAllergies();
          evaluateSpiritualLife();
          vm.signupService.spiritualLifeShown = true;
          break;
        case '3':
          evaluateMedicationsTaking();
          evaluateMedicalRestrictions();
          break;
        case '5':
          evaluatePreviousTripExperience();
          break;
        case '6':
          evaluateFrequentFlyers();
          evaluateExperienceAbroad();
          break;
        default:
          break;
      }
    }

    // populate dropdowns and select defaults
    function evaluateAllergies() {
      if (!vm.allergies.attribute) {
        vm.allergies.attribute = {
          attributeId: attributes.ALL_ALLERGIES
        };
      }
    }

    function evaluateExperienceAbroad() {
      if (!vm.experienceAbroad.attribute) {
        vm.experienceAbroad.attribute = {
          attributeId: attributes.EXPERIENCE_ABROAD
        };
      }
    }

    function evaluateFrequentFlyers() {
      _.forEach(vm.frequentFlyers, function(flyer) {
        if (flyer.notes) {
          flyer.selected = true;
        }
      });
    }

    function evaluateMedicalRestrictions() {
      if (!vm.medicalRestrictions.attribute) {
        vm.medicalRestrictions.attribute = {
          attributeId: attributes.MEDICAL_RESTRICTIONS
        };
      }
    }

    function evaluateMedicationsTaking() {
      if (!vm.medicationsTaking.attribute) {
        vm.medicationsTaking.attribute = {
          attributeId: attributes.MEDICATION_TAKING
        };
      }
    }

    function evaluatePreviousTripExperience() {
      if (!vm.tripExperience.attribute) {
        vm.tripExperience.attribute = {
          attributeId: attributes.PREVIOUS_TRIP_EXPERIENCE
        };
      }

    }

    function evaluateSpiritualLife() {
      if (!vm.signupService.spiritualLifeShown) {
        _.forEach(vm.spiritualLife, function(spirit) {
          if (spirit.selected) {
            spirit.selected = false;
            spirit.endDate = new Date();
          }
        });
      }
    }

  }
})();
