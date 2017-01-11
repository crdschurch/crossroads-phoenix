(function() {
  'use strict';

  var constants = require('crds-constants');
  module.exports = FormField;

  FormField.$inject = ['$templateRequest', '$compile', 'Validation'];

  function FormField($templateRequest, $compile, Validation) {
    return {
      restrict: 'E',
      scope: {
        field: '=?',
        data: '=?',
        parentForm: '='
      },
      link: function(scope, element) {
        var templateUrl = getTemplateUrl(scope.formField.field);
        if (templateUrl == null) {
          return;
        }

        scope.attributeTypeIds = constants.ATTRIBUTE_TYPE_IDS;

        $templateRequest(templateUrl).then(function(html) {
          var template = angular.element(html);
          element.append(template);
          $compile(template)(scope);
        });
      },

      controller: FormFieldController,
      controllerAs: 'formField',
      bindToController: true
    };

    function getTemplateUrl(field) {
      switch (field.className) {
        case 'ProfileField':
        case 'GroupParticipantField':
          return getCMSTemplateUrl(field);
        case 'EditableFormStep':
          return null;
        default:
          return 'default/defaultField.html';
      }
    }

    function getCMSTemplateUrl(field) {
      //TODO: See if we can simplify / possibly strategy pattern
      switch (field.templateType) {
        case 'Birthday':
          return 'profile/birthdate.html';
        case 'Childcare':
          return 'groupParticipant/childcare.html';
        case 'CoParticipant':
          return 'groupParticipant/coParticipant.html';
        case 'CoFacilitator':
          return 'groupParticipant/coFacilitator.html';
        case 'Email':
          return 'profile/email.html';
        case 'Ethnicity':
          return 'profile/ethnicity.html';
        case 'FacilitatorTraining':
          return 'groupParticipant/facilitatorTraining.html';
        case 'Gender':
          return 'profile/gender.html';
        case 'KickOffEvent':
          return 'groupParticipant/kickOffEvent.html';
        case 'Leader':
          return null;
        case 'Location':
          return 'profile/location.html';
        case 'Member':
          return null;
        case 'Name':
          return 'profile/name.html';
        case 'GroupsUndivided':
          return 'groupParticipant/preferredSession.html';
        default:
          return 'default/defaultField.html';
      }
    }
  
    function FormFieldController() {
      var vm = this;
      var now = new Date();
      vm.attributeSelected = attributeSelected;
      vm.enforceAgeRestriction = 13 
      vm.initDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      vm.initDate.setFullYear(vm.initDate.getFullYear() - vm.enforceAgeRestriction);
      vm.maxBirthdate = new Date(now.getFullYear() - vm.enforceAgeRestriction, now.getMonth(), now.getDate());
     
      vm.oneHundredFiftyYearsAgo = new Date(now.getFullYear() - 150, now.getMonth(), now.getDate());
      vm.openBirthdatePicker = openBirthdatePicker; 
      vm.required = (vm.field.required === '1');
      vm.validate = validate;

      // TODO: Consider moving this logic and template to location directive
      if (vm.field.templateType === 'Location') {
        vm.validLocations = getValidLocationIds(vm.data.locations);
      }

      vm.attributeSelected = attributeSelected;

      function attributeSelected(attributes) {
        var selected = _.some(attributes, function(attribute) {
          return attribute.selected;
        });

        return selected;
      }

      function openBirthdatePicker($event) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.birthdateOpen = !vm.birthdateOpen;
      }

      function validate(fieldName) {
        return Validation.showErrors(vm.parentForm, fieldName);
      }

      function getValidLocationIds(locations) {
        return _.map(locations, function(location) {
          return location.dp_RecordID;
        });
      }
    }
  }
})();