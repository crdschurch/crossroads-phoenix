import CONSTANTS from 'crds-constants';
import './cancel_event.html';
import cancelEventController from './cancelEvent.controller';

export default angular
.module(CONSTANTS.MODULES.MPTOOLS)
.controller('CancelEventController', cancelEventController);