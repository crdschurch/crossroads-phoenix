import CONSTANTS from 'crds-constants';
import './add_event.html';
import addEventComponent from './addEvent.component';

export default angular
.module(CONSTANTS.MODULES.MPTOOLS)
.component('addEvent', addEventComponent())
;
