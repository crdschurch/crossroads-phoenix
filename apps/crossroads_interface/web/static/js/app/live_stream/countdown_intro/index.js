import CONSTANTS from 'crds-constants';
import countdownIntroComponent from './countdownIntro.component';
import html from './countdownIntro.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('countdownIntro', countdownIntroComponent());