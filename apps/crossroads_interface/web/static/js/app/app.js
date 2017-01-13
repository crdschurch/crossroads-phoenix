import myserve from './my_serve';
require('./mp_tools');
//require('./group_tool');
//require('./live_stream');
require('ui-select/dist/select.css');

  var constants = require('constants');

  angular.module(constants.MODULES.CROSSROADS, [
      constants.MODULES.CHILDCARE_DASHBOARD,
      constants.MODULES.CORE,
      constants.MODULES.COMMON,
      constants.MODULES.FORM_BUILDER,
      constants.MODULES.GIVE,
      constants.MODULES.GO_VOLUNTEER,
      constants.MODULES.MEDIA,
      //constants.MODULES.LIVE_STREAM,
      constants.MODULES.MPTOOLS,
      myserve.name,
      //constants.MODULES.GROUP_TOOL,
      constants.MODULES.PROFILE,
      constants.MODULES.SEARCH,
      constants.MODULES.SIGNUP,
      constants.MODULES.TRIPS,
      constants.MODULES.CAMPS
   ]);

  angular.module(constants.MODULES.CROSSROADS)
    .config(require('./routes'))
    .config(require('./routes.content'));

  require('./events');
  require('./signup');
  require('./styleguide');
  require('./thedaily');
  require('./explore');
  require('./gotrips');
  require('./brave_at_home');
  require('./volunteer_signup');
  require('./volunteer_application');
  require('./giving_history');
