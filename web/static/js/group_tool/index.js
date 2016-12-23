
import CONSTANTS from 'crds-constants';
import ParticipantService from './services/participant.service';
import GroupService from './services/group.service';
import CreateGroupService from './services/createGroup.service';
import GroupDetailService from './services/groupDetail.service';
import groupToolRouter from './groupTool.routes';
import groupToolFormlyBuilderConfig from './groupTool.formlyConfig';
import './formlyWrappers/createGroupWrapper.html';
import './formlyWrappers/checkboxdescription.html';
import './formlyWrappers/createGroupProfilePicture.html';
import MessageService from './services/message.service';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL, [ CONSTANTS.MODULES.CORE, CONSTANTS.MODULES.COMMON,
                                          CONSTANTS.MODULES.FORMLY_BUILDER ]).
  config(groupToolRouter).
  config(groupToolFormlyBuilderConfig).
  service('ParticipantService', ParticipantService).
  service('GroupService', GroupService).
  service('CreateGroupService', CreateGroupService).
  service('MessageService', MessageService).
  service('GroupDetailService', GroupDetailService)
  ;

import myGroups from './my_groups';
import authModal from './auth_modal';
import confirmRequest from './confirm_request';
import createGroup from './create_group';
import groupDetail from './group_detail';
import groupMessage from './group_message';
import groupSearch from './group_search';
import editGroup from './edit_group';
import groupSearchResults from './group_search_results';
import groupInvitation from './group_invitation';
import endGroup from './end_group';
import filterResults from './group_search_filter';
import groupEmail from './group_email';
import groupResources from './group_resources';
import cms from './cms';
