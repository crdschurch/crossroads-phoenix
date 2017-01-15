import MyGroupsComponent from './myGroups.component';
import CONSTANTS from 'crds-constants';
import html from './myGroups.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('myGroups', MyGroupsComponent());

require('./group_card');
