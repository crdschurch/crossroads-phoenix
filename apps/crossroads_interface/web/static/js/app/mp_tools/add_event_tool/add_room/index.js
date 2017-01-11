import CONSTANTS from 'crds-constants';
import './add_room.html';
import addRoomComponent from './addRoom.component';

export default angular
.module(CONSTANTS.MODULES.MPTOOLS)
.component('addRoom', addRoomComponent());

import roomForm from './room_form';
import equipmentForm from './equipment_form';