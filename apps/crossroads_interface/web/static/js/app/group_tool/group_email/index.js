
import groupEmailComponent from './groupEmail.component';
import CONSTANTS from 'crds-constants';
import html from './groupEmail.html';

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL).
  component('groupEmail', groupEmailComponent())
  ;