(function(){
  'use strict';

  var constants = require('crds-constants');

  require('./host.html');
  require('./host_questions.html');
  require('./host_review.html');
  require('./host_confirm.html');
  require('./templates/example_group.html');

  angular.module(constants.MODULES.GROUP_FINDER)
    .config(require('./host.routes'))
    .controller('HostCtrl',           require('./host.controller'))
    .controller('HostQuestionsCtrl',  require('./host_questions.controller'))
    .controller('HostReviewCtrl',     require('./host_review.controller'))
    .controller('HostConfirmCtrl',    require('./host_confirm.controller'))
    ;

})();
