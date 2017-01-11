(function() {
  'use strict';

  var constants = require('crds-constants');

  // Questions
  require('./questions/questions.html');

  // Question
  require('./question/question.html');
  require('./question/input_radio.html');
  require('./question/input_text.html');
  require('./question/input_textarea.html');
  require('./question/input_number.html');
  require('./question/input_checkbox.html');
  require('./question/input_select.html');
  require('./question/input_address.html');
  require('./question/input_date_and_time.html');

  // Group Profile
  require('./group_profile/group_profile.html');

  angular.module(constants.MODULES.GROUP_FINDER)
    .directive('questions',           require('./questions/questions.directive'))
    .controller('QuestionsCtrl',      require('./questions/questions.controller'))

    .directive('question',            require('./question/question.directive'))
    .controller('QuestionCtrl',       require('./question/question.controller'))

    .directive('groupProfile',        require('./group_profile/group_profile.directive'))
    .controller('GroupProfileCtrl',   require('./group_profile/group_profile.controller'))

    .directive('groupCard',           require('./group_card/group_card.directive'))
    .directive('groupInvitation',     require('./group_invitation/group_invitation.directive'))
    .directive('memberCard',          require('./member_card/member_card.directive'));
})();