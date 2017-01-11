import CONSTANTS from 'crds-constants';
import streamVideojsComponent from './streamVideojs.component';
import html from './streamVideojs.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .component('streamVideojs', streamVideojsComponent());