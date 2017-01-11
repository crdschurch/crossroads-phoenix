
import groupInvitationComponent from './groupInvitation.component';
import CONSTANTS from 'crds-constants';
import html from './groupInvitation.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('groupInvitation', groupInvitationComponent())
  ;