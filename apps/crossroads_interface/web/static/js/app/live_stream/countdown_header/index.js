import CONSTANTS from 'crds-constants';
import countdownHeaderComponent from './countdownHeader.component';
import html from './countdownHeader.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('countdownHeader', countdownHeaderComponent());