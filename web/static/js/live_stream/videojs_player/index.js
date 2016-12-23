import CONSTANTS from 'crds-constants';
import videojsPlayerComponent from './videojsPlayer.component';
import html from './videojsPlayer.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('videojsPlayer', videojsPlayerComponent());