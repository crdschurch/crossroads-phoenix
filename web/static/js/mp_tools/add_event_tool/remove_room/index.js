import CONSTANTS from 'crds-constants';
import './remove_room.html';
import removeRoomController from './removeRoom.controller';

export default angular
.module(CONSTANTS.MODULES.MPTOOLS)
.controller('RemoveRoomController', removeRoomController);
