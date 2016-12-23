(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.FORM_BUILDER;

  angular.module(MODULE, ['crossroads.core', 'crossroads.common'])
    .config(require('./formBuilder.routes'))
    .factory('FormBuilderService', require('./formBuilder.service'))
    .factory('FormBuilderFieldsService', require('./formBuilderFields.service'))
    .factory('FormBuilderResolverService', require('./formBuilderResolver.service'))
    .directive('formBuilder', require('./formBuilder.directive'))
    .directive('formField', require('./formField.directive'))
    .controller('FormBuilderCtrl', require('./formBuilder.controller'))
    ;

  //Require Templates
  require('./templates/formBuilder.html');
  require('./templates/default/defaultField.html');
  require('./templates/groupParticipant/childcare.html');
  require('./templates/groupParticipant/coFacilitator.html');
  require('./templates/groupParticipant/coParticipant.html');
  require('./templates/groupParticipant/facilitatorTraining.html');
  require('./templates/groupParticipant/kickOffEvent.html');
  require('./templates/groupParticipant/preferredSession.html');
  require('./templates/profile/birthdate.html');
  require('./templates/profile/email.html');
  require('./templates/profile/ethnicity.html');
  require('./templates/profile/gender.html');
  require('./templates/profile/location.html');
  require('./templates/profile/name.html');

})();
