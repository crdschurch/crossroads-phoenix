
import groupMessageComponent from './groupMessage.component';
import CONSTANTS from 'crds-constants';
import html from './groupMessage.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('groupMessage', groupMessageComponent())
  ; 