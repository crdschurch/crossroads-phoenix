
import groupDetailInviteComponent from './groupDetail.invite.component';
import CONSTANTS from 'crds-constants';
import html from './groupDetail.invite.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('groupDetailInvite', groupDetailInviteComponent())
  ;