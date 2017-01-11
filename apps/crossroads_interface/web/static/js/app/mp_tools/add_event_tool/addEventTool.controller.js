export default class AddEventToolController {
  /* @ngInject*/
  constructor($rootScope, $window, $log, $modal, MPTools, AuthService, EventService, CRDS_TOOLS_CONSTANTS, AddEvent) {
    this.rootScope = $rootScope;
    this.window = $window;
    this.log = $log;
    this.MPTools = MPTools;
    this.AuthService = AuthService;
    this.EventService = EventService;
    this.modal = $modal;
    this.CRDS_TOOLS_CONSTANTS = CRDS_TOOLS_CONSTANTS;
    this.AddEvent = AddEvent;
  }

  $onInit() {
    this.event = this.AddEvent.eventData.event;
    this.params = this.MPTools.getParams();
    this.processing = false;
    this.rooms = this.AddEvent.eventData.rooms;

    this.viewReady = false;
    this.currentEventSelected = (this.params.recordId != null) ? Number(this.params.recordId) : -1;
    if (this.currentEventSelected !== -1) {
      // tool was launched from the details view...
      this.AddEvent.editMode = true;
      this.EventService.eventTool.get({ eventId: this.currentEventSelected }, (evt) => {
        this.AddEvent.eventData = this.AddEvent.fromEventDto(evt);
        this.event = this.AddEvent.eventData.event;
        this.rooms = this.AddEvent.eventData.rooms;
        this.AddEvent.currentPage = 1;
        this.viewReady = true;

        if (this.AddEvent.eventData.event.isSeries) {
          this.recurringEventModal();
        }
      },
        (err) => {
          console.error(`failed to get event ${this.currentEventSelected} + with error ${err}`);
          this.viewReady = true;
        });
    } else {
      this.viewReady = true;
    }
  }

  allowAccess() {
    const authenticated = this.AuthService.isAuthenticated();
    const authorized = this.AuthService.isAuthorized(this.CRDS_TOOLS_CONSTANTS.SECURITY_ROLES.EventsRoomsEquipment);
    return (authenticated && authorized);
  }

  back() {
    this.AddEvent.currentPage = 1;
  }

  currentPage() {
    return this.AddEvent.currentPage;
  }

  isEditMode() {
    return this.AddEvent.editMode;
  }

  next() {
    this.allData.eventForm.$setSubmitted();

    this.AddEvent.eventData.event = this.event;
    if (this.allData.eventForm.$valid) {
      // if is editMode
      if (this.AddEvent.editMode) {
        if (!this.canSaveMaintainOldReservation()) {
          this.continueEdit();
          return;
        }
      }
      this.AddEvent.currentPage = 2;
    } else {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
    }
  }

  continueEditModal() {
    const modalInstance = this.modal.open({
      controller: 'ContinueEditController',
      controllerAs: 'continueEdit',
      templateUrl: 'continue_reservation_edit/continue_edit.html'
    });
    return modalInstance;
  }

  continueEdit() {
    const modalInstance = this.continueEditModal();

    modalInstance.result.then(() => {
      this.rooms = [];
      this.AddEvent.currentPage = 2;
    }, () => {
      return;
    });
  }

  recurringEventModal() {
    const modalInstance = this.modal.open({
      controller: 'RecurringEventController',
      controllerAs: 'recurringEvent',
      templateUrl: 'recurring_event/recurring_event.html'
    });
  }

  cancelEventClicked() {
    const modalInstance = this.modal.open({
      controller: 'CancelEventController',
      controllerAs: 'cancelEvent',
      templateUrl: 'cancel_event/cancel_event.html'
    });

    modalInstance.result.then(() => {
      this.cancelEvent();
    }, () => {
      return;
    });
  }

  cancelEvent() {
    // TODO: Split this out a bit?
    this.processing = true;
    _.forEach(this.rooms, (room) => {
      room.cancelled = true;
      room.notes = (room.notes != null) ? `***Cancelled***${room.notes}` : '***Cancelled***';
      _.forEach(room.equipment, (equipment) => {
        equipment.equipment.notes = (equipment.equipment.notes != null) ? `***Cancelled***${equipment.equipment.notes}` : '***Cancelled***';
        equipment.equipment.cancelled = true;
      });
    });

    this.AddEvent.eventData.event.cancelled = true;
    this.AddEvent.eventData.rooms = this.rooms;
    const event = this.AddEvent.getEventDto(this.AddEvent.eventData);
    event.startDateTime = moment(event.startDateTime).utc().format();
    event.endDateTime = moment(event.endDateTime).utc().format();
    this.processEdit(event);
  }

  canSaveMaintainOldReservation() {
    //Start Date
    let curSD = this.event.startDate;
    let oldSD = this.AddEvent.origStartDate;
    let sameSD = oldSD.toDateString() == curSD.toDateString();
    //Start Time
    let curST = this.event.startTime;
    let oldST = this.AddEvent.origStartTime;
    let sameST = oldST.getTime() == curST.getTime();
    let curSDT = this.AddEvent.dateTime(curSD, curST);
    let oldSDT = this.AddEvent.dateTime(oldSD, oldST);
    //End Time
    let curET = this.event.endTime;
    let oldET = this.AddEvent.origEndTime;
    let sameET = oldET.getTime() == curET.getTime();
    //End Date
    let curED = this.event.endDate;
    let oldED = this.AddEvent.origEndDate;
    let sameED = oldED.toDateString() == curED.toDateString();
    let curEDT = this.AddEvent.dateTime(curED, curET);
    let oldEDT = this.AddEvent.dateTime(oldED, oldET);
    //Congregation
    let sameCongregation = this.AddEvent.origCongregation == this.event.congregation.dp_RecordID;

    if (sameSD && sameED && sameST && sameET && sameCongregation) {
      return true;
    } else {
      if (!sameCongregation) {
        return false;
      } else {
        return this.doesDateRangeFitInsideOtherDateRange(oldSDT, oldEDT, curSDT, curEDT);
      }
    }
  }

  doesDateRangeFitInsideOtherDateRange(oldStartDate, oldEndDate, newStartDate, newEndDate) {
    return (newStartDate >= oldStartDate && newEndDate <= oldEndDate);
  }

  submit() {
    // prompt user to either save room or add a room
    if (this.allData.roomForm === undefined) {
      if (!confirm('Do you want to save without adding a room?')) {
        return;
      }
    }
    this.processing = true;
    this.AddEvent.eventData.rooms = this.rooms;
    if (this.allData.roomForm) {
      this.allData.roomForm.$setSubmitted();
      this.allData.roomForm.equipmentForm.$setSubmitted();
    }

    if (this.allData.$valid) {
      // build the dto...
      const event = this.AddEvent.getEventDto(this.AddEvent.eventData);
      event.startDateTime = moment(event.startDateTime).utc().format();
      event.endDateTime = moment(event.endDateTime).utc().format();
      if (this.AddEvent.editMode) {
        this.processEdit(event);
      } else {
        this.processSave(event);
      }

      return;
    }

    this.processing = false;
    this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
    console.log('form errors');
  }

  processEdit(event) {
    this.EventService.eventTool.update({ eventId: this.currentEventSelected }, event, (result) => {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.eventUpdateSuccess);
      this.AddEvent.eventData = {};
      this.processing = false;
      this.window.close();
    },
      (err) => {
        this.log.error(err);
        this.processing = false;
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.eventToolProblemSaving);
      }
    );
  }

  processSave(event) {
    this.EventService.create.save(event, (result) => {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.eventSuccess);
      this.AddEvent.currentPage = 1;
      this.AddEvent.eventData = { event: {}, rooms: [], group: {} };
      this.rooms = [];
      this.event = {};
      this.processing = false;
      this.window.close();
    },
      (result) => {
        this.log.error(result);
        this.processing = false;
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.eventToolProblemSaving);
      });
  }
}
