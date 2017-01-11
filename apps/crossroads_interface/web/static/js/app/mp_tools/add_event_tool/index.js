import addEventComponent from './addEventTool.component';
import eventService from './addEvent.service';
import CONSTANTS from 'crds-constants';

angular.module(CONSTANTS.MODULES.MPTOOLS)
  .component('addEventTool', addEventComponent())
  .factory('AddEvent', eventService);

import addEvent from './add_event';
import addRoom from './add_room';
import removeRoom from './remove_room';
import continueReservation from './continue_reservation_edit';
import recurringEvent from './recurring_event';
import cancelEvent from './cancel_event';
