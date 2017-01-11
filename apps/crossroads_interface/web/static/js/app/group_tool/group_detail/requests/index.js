
import groupDetailRequestsComponent from './groupDetail.requests.component';
import CONSTANTS from 'crds-constants';
import html from './groupDetail.requests.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('groupDetailRequests', groupDetailRequestsComponent())
  ;

import groupDetailInvite from './invite';