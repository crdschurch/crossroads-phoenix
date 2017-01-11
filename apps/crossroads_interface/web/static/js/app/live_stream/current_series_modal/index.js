import CONSTANTS from 'crds-constants';
import CurrentSeriesModalController from './currentSeriesModal.controller';
import html from './currentSeriesModal.html';


export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .controller('CurrentSeriesModalController', CurrentSeriesModalController)
;