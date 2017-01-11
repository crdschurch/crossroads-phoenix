import CONSTANTS from 'crds-constants';
import './recurring_event.html';
import recurringEventController from './recurring_event.controller';

export default angular
.module(CONSTANTS.MODULES.MPTOOLS)
.controller('RecurringEventController', recurringEventController);
