import CONSTANTS from 'crds-constants';
import './room_form.html';
import roomFormComponent from './roomForm.component';

export default angular
.module(CONSTANTS.MODULES.MPTOOLS)
.component('roomForm', roomFormComponent());
