import CONSTANTS from 'crds-constants';
import currentSeriesComponent from './currentSeries.component';
import html from './currentSeries.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('currentSeries', currentSeriesComponent());