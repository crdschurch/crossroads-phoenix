import CONSTANTS from 'crds-constants';
import geolocationComponent from './geolocation.component';
import html from './geolocation.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('geolocation', geolocationComponent());