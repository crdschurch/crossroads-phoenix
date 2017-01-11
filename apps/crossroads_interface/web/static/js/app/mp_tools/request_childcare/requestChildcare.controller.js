import moment from 'moment';
/* jshint unused: false */
import * as recur from 'moment-recur';

class RequestChildcareController {
  /*@ngInject*/
  constructor($rootScope,
              MPTools,
              CRDS_TOOLS_CONSTANTS,
              $log,
              RequestChildcareService,
              Validation,
              $cookies,
              $window) {
    this.allowAccess = MPTools.allowAccess(CRDS_TOOLS_CONSTANTS.SECURITY_ROLES.ChildcareRequestTool);
    if (!this.allowAccess) {
      this.viewReady = true;
      return;
    }
    this.congregations = RequestChildcareService.getCongregations();
    this.currentRequest = Number(MPTools.getParams().recordId);
    this.datesList = [];
    this.customSessionSelected = false;
    this.customSessionTime = 'Customize My Childcare Session...';
    this.loadingGroups = false;
    this.log = $log;
    this.ministries = RequestChildcareService.getMinistries();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.mpTools = MPTools;
    this.name = 'request-childcare';
    this.requestChildcareService = RequestChildcareService;
    this.rootScope = $rootScope;
    this.runDateGenerator = true;
    this.startTime = new Date();
    this.startTime.setHours(9);
    this.startTime.setMinutes(30);
    this.endTime = new Date();
    this.endTime.setHours(10);
    this.endTime.setMinutes(30);
    this.uid = $cookies.get('userId');
    this.validation = Validation;
    this.viewReady = false;
    this.window = $window;
    this.datesSelected = true;
    this.recordId = -1;
    this.updating = false;
    this.error = false;

    if (this.allowAccess) {
      this.recordId = Number(MPTools.getParams().recordId);
      if (this.recordId !== -1) {
        this.isRequestPending(this.populatePendingRequest, this.showError);
      } else {
        this.viewReady = true;
      }
    }
  }

  filterTimes(time) {
    let t = time;
    if (time.Childcare_Start_Time === undefined && Number(this.choosenPreferredTime) !== -1) {
      t = _.find(this.filteredTimes, (tm) => {
        return tm.dp_RecordID === Number(time);
      });
    }
    return t;
  }

  formatPreferredTime(time) {
    if (time.dp_RecordID === -1) {
            return this.customSessionTime;
    } else {
      time = this.filterTimes(time);
      const startTimeArr = time['Childcare_Start_Time'].split(':');
      const endTimeArr = time['Childcare_End_Time'].split(':');
      const startTime = moment().set(
        {'hour': parseInt(startTimeArr[0]), 'minute': parseInt(startTimeArr[1])});
      const endTime = moment().set(
        {'hour': parseInt(endTimeArr[0]), 'minute': parseInt(endTimeArr[1])});
      const day = time['Meeting_Day'];
      return `${day}, ${startTime.format('h:mmA')} - ${endTime.format('h:mmA')}`;
    }
  }

  generateDateList(defaultSelection = true) {
    if (this.runDateGenerator) {
      this.datesSelected = true;
      let dayOfWeek = this.choosenPreferredTime.Meeting_Day;
      if (this.choosenPreferredTime.dp_RecordID === -1) {
        dayOfWeek = this.dayOfWeek;
      }
      const start = moment(this.startDate);
      const end = moment(this.endDate);
      if (this.choosenFrequency === 'Weekly') {
        let weekly = moment().recur(start, end).every(dayOfWeek).daysOfWeek();
        this.datesList = weekly.all().map( (d) => {
          return { 
            unix: d.unix(),
            date: d,
            selected: defaultSelection
          };
        });
      } else if (this.choosenFrequency === 'Monthly') {
        let weekOfMonth = this.getWeekOfMonth(start);
        let monthly = moment().recur(start, end)
          .every(dayOfWeek).daysOfWeek()
          .every(weekOfMonth -1).weeksOfMonthByDay();
        this.datesList = monthly.all().map( (d) => {
          return {
            unix: d.unix(),
            date: d,
            selected: defaultSelection
          };
        });
      } else {
        // use the startDate and make sure it aligns with the day
        if (start.day() === moment().day(dayOfWeek).day()) {
          this.datesList = [{ unix: start.unix(), date: start, selected: true}];
        } else {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.daysDoNotMatch);
          this.datesList = [];
        }
      }
      this.runDateGenerator = false;
    }
  }

  getTimeHours(timeString) {
    var militaryTime = moment(timeString, ['hh:mm A']).format('HH:mm');
    return militaryTime.split(':')[0];
  }

  getTimeMinutes(timeString) {
    var militaryTime = moment(timeString, ['hh:mm A']).format('HH:mm');
    return militaryTime.split(':')[1];
  }

  getGroups() {
    if (this.choosenCongregation && this.choosenMinistry) {
      this.loadingGroups = true;
      this.groups = this.requestChildcareService
        .getGroups(this.choosenCongregation.dp_RecordID, this.choosenMinistry.dp_RecordID);
      this.groups.$promise
        .then(() => this.loadingGroups = false, () => this.loadingGroups = false);
      this.preferredTimes = this.requestChildcareService.getPreferredTimes( this.choosenCongregation.dp_RecordID);
      this.preferredTimes.$promise.then(() => {
        this.preferredTimes = [...this.preferredTimes, {
          Childcare_Start_Time: null,
          Childcare_End_Time: null,
          Meeting_Day: null, dp_RecordID: -1,
          End_Date: null
        }];
        this.filteredTimes = this.preferredTimes;
      });
    }
  }

  getWeekOfMonth(startDate) {
    return Math.ceil(startDate.date() / 7);
  }

  isRequestPending(success, error) {
    this.request = this.requestChildcareService.getChildcareRequest(this.recordId, (d) => {
      if (d.Status === 'Pending') {
        success(d, this);
      } else {
        error(this);
      }
    });
  }

  onEndDateChange(endDate) {
    this.endDate = endDate;
    this.runDateGenerator = true;
  }

  onFrequencyChange() {
    this.runDateGenerator = true;
  }

  onDateSelectionChange() {
    let datesSelected = this.datesList.filter( (d) => { return d.selected; });
    this.datesSelected = datesSelected.length > 0;
  }

  onDayChange() {
    this.runDateGenerator = true;
  }

  onStartDateChange(startDate) {
    this.startDate = startDate;
    this.runDateGenerator = true;
    this.filteredTimes = this.preferredTimes.filter((time) => {
      if (time.End_Date === null) { return true; }

      var preferredStart = moment(startDate);
      var endDate = moment(time.End_Date);
      return preferredStart.isBefore(endDate) || preferredStart.isSame(endDate);
    });
  }

  populatePendingRequest(d, context = this) { 
    context.updating = true;
    context.startDate = new Date(moment(d.StartDate));
    context.endDate = new Date(moment(d.EndDate));
    context.choosenCongregation = _.find(context.mpTools.congregations, (c) => {
      return c.dp_RecordID === d.LocationId;
    });

    context.choosenMinistry = _.find(context.mpTools.ministries, (c) => {
      return c.dp_RecordID === d.MinistryId;
    });
    context.choosenGroup = _.find(context.getGroups(), (c) => {
      return c.dp_RecordID === d.GroupId;
    });
    context.choosenGroup = { dp_RecordID: d.GroupId,  dp_RecordName: d.GroupName };
    context.choosenFrequency = d.Frequency;
    context.notes = d.Notes;

    context.preferredTimes.$promise.then(() => {
      context.choosenPreferredTime = _.find(context.filteredTimes, (c) => {
        return context.formatPreferredTime(c) === d.PreferredTime;
      });

      if (context.choosenPreferredTime === undefined) {
        context.choosenPreferredTime = _.find(context.filteredTimes, (c) => {
          return context.formatPreferredTime(c) === context.customSessionTime;
        });
        context.customSessionSelected = true;
        var customDay = d.PreferredTime.substr(0, d.PreferredTime.indexOf(','));
        context.dayOfWeek = customDay;

        var times = d.PreferredTime.split(' ');
        context.startTime.setHours(context.getTimeHours(times[1]));
        context.startTime.setMinutes(context.getTimeMinutes(times[1]));

        context.endTime.setHours(context.getTimeHours(times[3]));
        context.endTime.setMinutes(context.getTimeMinutes(times[3]));
      }
    });

    context.runDateGenerator = false;
    context.datesList = d.DatesList.map((date) => {
      return { selected: true, date: moment(date), unix: moment(date).unix(), };
    });
    context.viewReady = true;
  }

  preferredTimeChanged() {
    if (this.choosenPreferredTime.dp_RecordID === -1) {
      this.customSessionSelected = true;
    } else {
      this.customSessionSelected = false;
    }
    this.runDateGenerator = true;
  }

  showError(context = this) {
    context.viewReady = true;
    context.error = true;
    context.errorMessage = context.rootScope.MESSAGES.mptool_access_error;
  }

  showGaps() {
    if (this.choosenPreferredTime &&
        (this.choosenPreferredTime.Meeting_Day !== null || this.dayOfWeek) &&
        this.choosenFrequency &&
        this.startDate &&
        this.endDate) {
      const start = this.startDate.getTime();
      const end = this.endDate.getTime();
      if (start < end || start === end) {
        this.generateDateList();
        if (this.choosenFrequency === 'Once') {
          return false;
        }

        return this.datesList.length > 0;
      }

      return false;
    }

    return false;
  }

  showGroups() {
    return this.choosenCongregation && this.choosenMinistry && this.groups.length > 0;
  }

  submit() {
    this.saving = true;
    if (this.childcareRequestForm.$invalid) {
      this.saving = false;
      return false;
    } else if (this.datesList.length < 1) {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.noDatesChosen);
      return false;
    } else {
      let time = this.formatPreferredTime(this.choosenPreferredTime);
      if (this.choosenPreferredTime.dp_RecordID === -1) {
        let start = moment(this.startTime);
        let end = moment(this.endTime);
        time = `${this.dayOfWeek}, ${start.format('h:mmA')} - ${end.format('h:mmA')}`;
      }
      const dto = {
        childcareRequestId: this.recordId,
        requester: this.uid,
        site: this.choosenCongregation.dp_RecordID,
        ministry: this.choosenMinistry.dp_RecordID,
        group: this.choosenGroup.dp_RecordID,
        startDate: moment(this.startDate).utc(),
        endDate: moment(this.endDate).utc(),
        frequency: this.choosenFrequency,
        timeframe: time,
        notes: this.notes,
        dates: this.datesList.filter( (d) => { return d.selected === true;}).map( (d) => { return d.date; })
      };
      if (this.updating) {
        const save = this.requestChildcareService.updateRequest(dto);
        save.$promise.then(() => {
          this.log.debug('updated!');
          this.saving = false;
          this.updating = false;
          this.window.close();
        }, () => {
          this.saving = false;
          this.log.error('error!');
          this.saving = false;
          this.updating = false;
        });
      } else {
        const save = this.requestChildcareService.saveRequest(dto);
        save.$promise.then(() => {
          this.log.debug('saved!');
          this.saving = false;
          this.window.close();
        }, () => {
          this.saving = false;
          this.log.error('error!');
          this.saving = false;
        });
      }
    }
  }

  validateField(fieldName) {
    return this.validation.showErrors(this.childcareRequestForm, fieldName);
  }

  validateDateSelection() {
      return !this.datesSelected;
  }

  validTimeRange(form) {
    if (form === undefined) {
      return false;
    }

    //verify that times are valid;
    var start;
    var end;
    try {
      start =  moment(this.startTime);
      end = moment(this.endTime);
    } catch (err) {
      form.endTime.$error.invalidEnd = true;
      form.endTime.$valid = false;
      form.endTime.$invalid = true;
      form.endTime.$dirty = true;
      form.$valid = false;
      form.$invalid = true;
      return true;
    }

    if (start <= end) {
      form.endTime.$error.invalidEnd = false;
      form.endTime.$valid = true;
      form.endTime.$invalid = false;
      return false;
    }

    // set the endTime Invalid...
    form.endTime.$error.invalidEnd = true;
    form.endTime.$valid = false;
    form.endTime.$invalid = true;
    form.endTime.$dirty = true;
    form.$valid = false;
    form.$invalid = true;
    return true;
  }
}
export default RequestChildcareController;
