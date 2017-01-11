import CONSTANTS from 'crds-constants';
import streamspotPlayerComponent from './streamspotPlayer.component';
import html from './streamspotPlayer.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('streamspotPlayer', streamspotPlayerComponent());