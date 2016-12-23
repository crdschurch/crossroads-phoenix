export default class AddEventToolController {
    /* @ngInject*/
  constructor($rootScope, $window, $log, MPTools, AuthService, EventService, CRDS_TOOLS_CONSTANTS, AddEvent) {
    this.rootScope = $rootScope;
    this.window = $window;
    this.log = $log;
    this.MPTools = MPTools;
    this.AuthService = AuthService;
    this.EventService = EventService;
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
        this.AddEvent.currentPage = 2;
        this.viewReady = true;
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

        // TODO: why does the form get set as valid even if
        // the min and max children are invalid?
    if (this.allData.eventForm.$valid &&
            this.allData.eventForm.maximumChildren.$valid &&
            this.allData.eventForm.minimumChildren.$valid
        ) {
      this.AddEvent.currentPage = 2;
    } else {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
    }
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