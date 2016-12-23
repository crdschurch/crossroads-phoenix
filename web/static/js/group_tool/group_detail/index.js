import groupDetailComponent from './groupDetail.component';
import CONSTANTS from 'crds-constants';
import html from './groupDetail.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('groupDetail', groupDetailComponent())
  ;

import groupDetailAbout from './about';
import groupDetailParticipants from './participants';
import groupDetailRequests from './requests';