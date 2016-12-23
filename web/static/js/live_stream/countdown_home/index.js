import CONSTANTS from 'crds-constants';
import countdownHomeComponent from './countdownHome.component';
import html from './countdownHome.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('countdownHome', countdownHomeComponent());