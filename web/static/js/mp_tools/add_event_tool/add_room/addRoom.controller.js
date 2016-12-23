import CONSTANTS from 'crds-constants';

export default class AddRoomController {
  /* @ngInject */
  constructor($log, $rootScope, $modal, AddEvent, Lookup, Room) {
    this.log = $log;
    this.rootScope = $rootScope;
    this.modal = $modal;
    this.addEvent = AddEvent;
    this.lookup = Lookup;
    this.room = Room;
    this.equipmentList = [];
    this.roomError = false;
    this.viewReady = false;
    this.rooms = [];
    this.available = CONSTANTS.EVENTS.ROOM_AVAILABLE;
  }

  $onInit() {
    this.layouts = this.room.Layouts.query();
    if (this.addEvent.editMode) {
      this.setCongregation();
    }
    if (this.addEvent.eventData.event.congregation !== undefined) {
      this.chosenSite = this.addEvent.eventData.event.congregation.dp_RecordName;
      this.room.ByCongregation.query({
        congregationId: this.addEvent.eventData.event.congregation.dp_RecordID,
        startDate: this.addEvent.dateTime(this.addEvent.eventData.event.startDate, this.addEvent.eventData.event.startTime),
        endDate: this.addEvent.dateTime(this.addEvent.eventData.event.endDate, this.addEvent.eventData.event.endTime)
      }, (data) => {
        this.setRoomData(data);
        this.setEquipmentData();
      });
      return;
    }
    this.log.error('The congregation was not passed in so we can\'t get the list of rooms or equipment');
  }

  setCongregation() {
    this.lookup.query({ table: 'crossroadslocations' }, (locations) => {
      this.addEvent.eventData.event.congregation = _.find(locations, (l) => {
        return l.dp_RecordID === this.addEvent.eventData.event.congregation.dp_RecordID;
      });
    }, (error) => {
      this.log.error(`Error getting congregations: ${error}`);
    });
  }

  setRoomData(data) {
    this.rooms = data;
    this.viewReady = true;
    this.roomData = _.filter(this.roomData, (r) => {
      if (r.name === undefined) {
        const tempRoom = _.find(data, (roo) => {
          return roo.id === r.id;
        });
        if (tempRoom) {
          r.name = tempRoom.name;
          return true;
        }
        return false;
      }
      return true;
    });
  }

  setEquipmentData() {
    this.room.Equipment.query({ congregationId: this.addEvent.eventData.event.congregation.dp_RecordID },
      (data) => {
        this.equipmentList = data;
        _.forEach(this.roomData, (roomD) => {
          roomD.equipment = this.mapEquipment(data, roomD.equipment);
        });
      }, (error) => {
        this.log.error(`Error getting available equipment: ${error}`);
      });
  }

  isCancelled(currentRoom) {
    return _.has(currentRoom, 'cancelled') && currentRoom.cancelled;
  }

  removeRoomModal(room) {
    const modalInstance = this.modal.open({
      controller: 'RemoveRoomController',
      controllerAs: 'removeRoom',
      templateUrl: 'remove_room/remove_room.html',
      resolve: {
        items() {
          return room;
        }
      }
    });
    return modalInstance;
  }

  onAdd() {
    if (this.chosenRoom) {
      // is this room already added?
      const alreadyAdded = _.find(this.roomData, (r) => {
        return r.id === this.chosenRoom.id;
      });

      if (alreadyAdded) {
        if (alreadyAdded.cancelled) {
          this.roomData[_.findIndex(this.roomData, (r)=>{return r.id === alreadyAdded.id})].cancelled = false;
        } else {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.allReadyAdded);
        }

        return;
      }

      this.roomData.push(this.chosenRoom);
      return;
    }

    this.rootScope.$emit('notify', this.rootScope.MESSAGES.chooseARoom);
  }

  mapEquipment(equipmentLookup, currentEquipmentList) {
    let values = _.map(currentEquipmentList, (current) => {
      if (current.equipment.name.quantity === undefined) {
        const found = _.find(equipmentLookup, (e) => {
          return e.id === current.equipment.name.id;
        });

        if (found) {
          current.equipment.name.quantity = found.quantity;
        }

        return current;
      }
    });

    return _.filter(values, (v) => {
      return v !== undefined;
    });
  }

  removeRoom(currentRoom) {
    this.log.debug(`remove room: ${currentRoom}`);
    const modalInstance = this.removeRoomModal(currentRoom);

    modalInstance.result.then(() => {
      if (!_.has(currentRoom, 'cancelled')) {
        this.roomData = _.filter(this.roomData, (r) => {
          // only return elements that aren't currentRoom
          return r.id !== currentRoom.id;
        });
      } else {
        currentRoom.cancelled = true;
        _.each(currentRoom.equipment, (e) => {
          e.equipment.cancelled = true;
        });
      }
    },

      () => {
        if (!_.has(currentRoom, 'cancelled') && currentRoom.cancelled) {
          this.log.info('user doesn\'t want to delete this room...');
          currentRoom.cancelled = false;
        }
      });
  }

  showNoRoomsMessage() {
    return (!this.viewReady || this.rooms === undefined || this.rooms.length < 1);
  }

}
