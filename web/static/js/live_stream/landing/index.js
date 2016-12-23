import CONSTANTS from 'crds-constants';
import landingComponent from './landing.component';
import html from './landing.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('landing', landingComponent());