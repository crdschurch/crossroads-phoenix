(function() {

  var MODULES = require('crds-constants').MODULES;

  angular.module(MODULES.PROFILE)
    .factory('Skills', require('./profileSkills.service'))
    .controller('ProfileSkillsController', require('./profileSkills.controller'))
    ;

  require('./profileSkills.html');

})();
