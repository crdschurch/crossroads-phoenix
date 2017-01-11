import groupDetailParticipantCardComponent from './groupDetail.participant.card.component';
import CONSTANTS from 'crds-constants';
import html from './groupDetail.participant.card.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('groupDetailParticipantCard', groupDetailParticipantCardComponent())
  ;