(function () {
  module.exports = AddEventToolService;

  AddEventToolService.$inject = [];

  function AddEventToolService() {
    const obj = {
      currentPage: 1,
      editMode: false,
      dateTime: dateTime,
      eventData: {
        event: {},
        rooms: [],
        group: {}
      },
      getEventDto(eventData) {
        let reminderDays = null;
        if (eventData.event.reminderDays !== undefined) {
          reminderDays = (eventData.event.reminderDays.dp_RecordID > 0) ? eventData.event.reminderDays.dp_RecordID : null;
        }


        return {
          congregationId: eventData.event.congregation.dp_RecordID,
          contactId: eventData.event.primaryContact.contactId,
          description: eventData.event.description,
          donationBatchTool: (eventData.event.donationBatch) ? eventData.event.donationBatch : false,
          endDateTime: dateTime(eventData.event.endDate, eventData.event.endTime),
          startDateTime: dateTime(eventData.event.startDate, eventData.event.startTime),
          meetingInstructions: eventData.event.meetingInstructions,
          eventTypeId: eventData.event.eventType.dp_RecordID,
          minutesSetup: eventData.event.minutesSetup,
          minutesTeardown: eventData.event.minutesCleanup,
          programId: eventData.event.program.ProgramId,
          reminderDaysId: reminderDays,
          title: eventData.event.eventTitle,
          sendReminder: eventData.event.sendReminder,
          maximumAge: eventData.event.maximumAge,
          minimumChildren: eventData.event.minimumChildren,
          maximumChildren: eventData.event.maximumChildren,
          participantsExpected: eventData.event.participantsExpected,
          group: getGroupDto(eventData.event),
          rooms: _.map(eventData.rooms, (r) => { return getRoomDto(r); })

        };
      },

      fromEventDto(event) {
        return {
          event: {
            congregation: {
              dp_RecordID: event.congregationId
            },
            primaryContact: {
              contactId: event.contactId
            },
            eventType: {
              dp_RecordID: event.eventTypeId
            },
            description: event.description,
            donationBatchTool: event.donationBatchTool,
            endDate: new Date(event.endDateTime),
            startDate: new Date(event.startDateTime),
            meetingInstructions: event.meetingInstructions,
            minutesSetup: event.minutesSetup,
            minutesCleanup: event.minutesTeardown,
            program: {
              ProgramId: event.programId
            },
            reminderDays: event.reminderDaysId,
            sendReminder: event.sendReminder,
            startTime: new Date(event.startDateTime),
            endTime: new Date(event.endDateTime),
            eventTitle: event.title,
            participantsExpected: event.participantsExpected,
            maximumAge: event.maximumAge,
            minimumChildren: event.minimumChildren,
            maximumChildren: event.maximumChildren
          },
          rooms: _.map(event.rooms, (r) => { return fromRoomDto(r); })
        };
      }
    };

    function getGroupDto(groupData) {
      // group type 27 is childcare. There is no selection for this in the event tool.
      // ministry 2 is Kids club. There is no selection for this in the event tool.
      // TODO: Need to find a way to remove this hard code

      if (groupData.eventType.dp_RecordName != 'Childcare') {
        return null;
      }

      const groupDto = {
        groupname: '__childcaregroup',
        grouptypeid: 27,
        ministryid: 2,
        congregationid: groupData.congregation.Congregation_ID,
        contactid: groupData.primaryContact.contactId,
        startdate: moment(dateTime(groupData.startDate, groupData.startTime)).utc().format(),
        maximumage: groupData.maximumAge,
        minimumparticipants: groupData.minimumChildren,
        tartgetsize: groupData.maximumChildren
      };

      return groupDto;
    }

    function getRoomDto(room) {
      const roomDto = {
        hidden: room.hidden,
        roomId: room.id,
        notes: room.notes,
        layoutId: room.layout.id,
        equipment: _.map(_.filter(room.equipment, (equip) => {
          return equip.equipment.name.id > 0;
        }), (e) => { return getEquipmentDto(e.equipment); })
      };
      if (_.has(room, 'cancelled')) {
        roomDto.cancelled = room.cancelled;
      }

      if (_.has(room, 'roomReservationId')) {
        roomDto.roomReservationId = room.roomReservationId;
      }

      return roomDto;
    }

    function getEquipmentDto(equipment) {
      const equipmentDto = {
        equipmentId: equipment.name.id,
        quantityRequested: equipment.choosenQuantity
      };
      if (_.has(equipment, 'cancelled')) {
        equipmentDto.cancelled = equipment.cancelled;
      }

      if (_.has(equipment, 'equipmentReservationId')) {
        equipmentDto.equipmentReservationId = equipment.equipmentReservationId;
      }

      return equipmentDto;
    }

    function fromRoomDto(roomDto) {
      return {
        hidden: roomDto.hidden,
        id: roomDto.roomId,
        layout: {
          id: roomDto.layoutId
        },
        notes: roomDto.notes,
        roomReservationId: roomDto.roomReservationId,
        cancelled: roomDto.cancelled,
        equipment: _.map(roomDto.equipment, (e) => {
          return fromEquipmentDto(e);
        })
      };
    }

    function fromEquipmentDto(equipmentDto) {
      return {
        equipment: {
          name: {
            id: equipmentDto.equipmentId
          },
          choosenQuantity: equipmentDto.quantityRequested,
          equipmentReservationId: equipmentDto.equipmentReservationId,
          cancelled: equipmentDto.cancelled
        }
      };
    }

    function dateTime(dateForDate, dateForTime) {
      return new Date(
          dateForDate.getFullYear(),
          dateForDate.getMonth(),
          dateForDate.getDate(),
          dateForTime.getHours(),
          dateForTime.getMinutes(),
          dateForTime.getSeconds(),
          dateForTime.getMilliseconds());
    }

    return obj;
  }
}());
