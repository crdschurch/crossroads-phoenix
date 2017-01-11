(function() {
  'use strict';

  var constants = require('crds-constants');

  module.exports = FormBuilderFieldsService;
  FormBuilderFieldsService.$inject = ['ContentPageService'];

  function FormBuilderFieldsService(ContentPageService) {
    var groupParticipantField = constants.CMS.FORM_BUILDER.CLASS_NAME.GROUP_PARTICIPANT_FIELD;
    var profileField = constants.CMS.FORM_BUILDER.CLASS_NAME.PROFILE_FILED;

    var service = {
      hasFieldsSection: hasFieldSection,
      hasGroupParticipant: hasGroupParticipant,
      hasProfile: hasProfile,
      getGroupRoleId: getGroupRoleId,
    };

    function hasFieldSection(section) {
      return _.some(ContentPageService.page.fields, function(field) {
        return field.className === section;
      });
    }

    function hasProfile() {
      return hasFieldSection(profileField);
    }

    function hasGroupParticipant() {
      return hasFieldSection(groupParticipantField);
    }



  function getGroupRoleId() {
    if (!hasFieldSection(groupParticipantField)) {
      return null;
    }

    var result = _.find(ContentPageService.page.fields, function(field) {
      return (field.className === groupParticipantField && field.templateType === 'Leader');
    });

    if (result) {
      return constants.GROUP.ROLES.LEADER;
    }

    return constants.GROUP.ROLES.MEMBER;
  }

  return service;
}
})();
