import groupCardComponent from './groupCard.component';
import CONSTANTS from 'crds-constants';
import html from './groupCard.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('groupCard', groupCardComponent());
