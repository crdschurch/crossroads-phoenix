import controller from './addRoom.controller';
import template from './add_room.html';

export default function AddRoomComponent() {
  return {
    restrict: 'E',
    bindings: {
      roomData: '='
    },
    template,
    controller,
    controllerAs: 'addRoom'
  };
}