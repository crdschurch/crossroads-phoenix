import CONSTANTS from 'crds-constants';
import GeolocationModalController from './geolocationModal.controller';
import html from './geolocationModal.html';


export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .controller('GeolocationModalController', GeolocationModalController)
;