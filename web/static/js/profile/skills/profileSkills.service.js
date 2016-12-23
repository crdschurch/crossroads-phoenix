(function() {
  'use strict()';

  module.exports = function SkillsService($resource) {
    return $resource(__API_ENDPOINT__ + 'api/contact/attribute/:contactId');
  };
})();
