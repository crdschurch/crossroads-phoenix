(function() {
  'use strict';

  module.exports = SkillsService;

  SkillsService.$inject = ['$resource'];

  function SkillsService($resource) {
    return $resource(__API_ENDPOINT__ + 'api/govolunteer/skills');
  }

})();
