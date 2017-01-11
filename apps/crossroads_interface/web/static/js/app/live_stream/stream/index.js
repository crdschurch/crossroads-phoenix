import CONSTANTS from 'crds-constants';
import streamComponent from './stream.component';
import geolocationController from '../geolocation/geolocation.controller';
import html from './stream.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .controller('GeolocationController', geolocationController)
  .component('stream', streamComponent());