import CONSTANTS from 'crds-constants';
import contentCardComponent from './contentCard.component';
import html from './contentCard.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('contentCard', contentCardComponent());