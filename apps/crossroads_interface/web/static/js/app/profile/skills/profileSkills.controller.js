(function() {
  'use strict()';

  module.exports = ProfileSkillsController;

  ProfileSkillsController.$inject = ['$rootScope', 'Skills', 'Session', 'Person'];

  function ProfileSkillsController($rootScope, Skills, Session, Person) {
    var vm = this;

    var attributeTypeIds = require('crds-constants').ATTRIBUTE_TYPE_IDS;
    var personSkills = Person.attributeTypes[attributeTypeIds.SKILLS].attributes;

    vm.flatSkills = personSkills;
    vm.groupedSkills = groupSkills(personSkills);
    vm.removeSkill = removeSkill;
    vm.skillChange = skillChange;

    function groupSkills(attributes) {
      var skillsByCategory = {};
      _.forEach(attributes, function(attribute) {
        if (attribute.category in skillsByCategory === false) {
          skillsByCategory[attribute.category] = {
            name: attribute.category,
            description: attribute.categoryDescription,
            skills: []
          };
        }

        skillsByCategory[attribute.category].skills.push(attribute);
      });

      return _.values(skillsByCategory);
    }

    function removeSkill(skill) {
      skill.selected = false;
      skillChange(skill);
    }

    function skillChange(skill) {
      if (skill.selected) {
        skill.startDate = moment();
      } else {
        skill.endDate = moment();
      }

      saveSkill(skill);
    }

    function saveSkill(skill) {
      var contactId = Session.exists('userId');
      Skills.save({contactId: contactId},
        skill,
        function(data) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.profileUpdated);
        }, function(reason) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        });
    }
  }
})();
