
import groupResourcesComponent from './groupResources.component';
import GroupResourcesService from './service/groupResources.service';
import CONSTANTS from 'crds-constants';
import html from './groupResources.html'; // jshint ignore:line

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  service('GroupResourcesService', GroupResourcesService).
  component('groupResources', groupResourcesComponent())
  ; 