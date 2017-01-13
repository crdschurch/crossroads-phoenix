import participantService from './participant.service';
import groupService from './group.service';
import createGroupService from './createGroup.service';
import groupDetailService from './groupDetail.service';
import CONSTANTS from 'constants';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL, [CONSTANTS.MODULES.CORE, CONSTANTS.MODULES.COMMON]).
  service('ParticipantService', participantService).
  service('GroupService', groupService).
  service('CreateGroupService', createGroupService).
  service('GroupDetailService', groupDetailService);
