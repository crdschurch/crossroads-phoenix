import CONSTANTS from 'crds-constants';

export default class RoomController {
    /* @ngInject */
  constructor(AddEvent, Validation) {
    this.addEvent = AddEvent;
    this.validation = Validation;
  }

  $onInit() {
    if (this.currentRoom.equipment === undefined) {
        this.currentRoom.equipment = [{ equipment: { name: { id: 0 }, quantity: 0 } }];
      }
  }

  existing() {
    return _.has(this.currentRoom, 'cancelled');
  }

  isCancelled() {
    return this.existing() && this.currentRoom.cancelled;
  }

  remove() {
    this.removeRoom();
  }
}
