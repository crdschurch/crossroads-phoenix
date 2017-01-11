import groupDetailAboutComponent from './groupDetail.about.component';
import CONSTANTS from 'crds-constants';
import html from './groupDetail.about.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('groupDetailAbout', groupDetailAboutComponent())
  ;