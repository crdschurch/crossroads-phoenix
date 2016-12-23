(function() {

  'use strict()';

  module.exports = SignupToServeController;

  SignupToServeController.$inject = [
    '$log',
    '$location',
    '$window',
    'MPTools',
    'Su2sData',
    'ServeOpportunities',
    '$rootScope',
    'AuthService',
    'CRDS_TOOLS_CONSTANTS'
  ];

  function SignupToServeController($log, $location, $window, MPTools, Su2sData, ServeOpportunities, $rootScope, AuthService, CRDS_TOOLS_CONSTANTS) {
    var vm = this;

    vm.allowAccess = allowAccess;
    vm.allParticipants = [];
    vm.cancel = cancel;
    vm.eventDates = [];
    vm.format = 'MM/dd/yyyy';
    vm.frequencies = [
      { value: 0, text: 'Once' },
      { value: 1, text: 'Every Week' },
      { value: 2, text: 'Every Other Week' }
    ];
    vm.fromOpened = false;
    vm.group = {};
    vm.isFrequencyOnce = isFrequencyOnce;
    vm.isFrequencyMoreThanOnce = isFrequencyMoreThanOnce;
    vm.open = openDatePicker;
    vm.params = MPTools.getParams();
    vm.populateDates = populateDates;
    vm.saveRsvp = saveRsvp;
    vm.showError = showError;
    vm.ready = false;

    activate();

    ////////////////////////////////////////////

    function activate() {
      Su2sData.get({
        'oppId': vm.params.recordId
      }, function(g) {
        vm.group = g;
        vm.allParticipants = g.Participants;
        vm.ready = true;
      });
      populateDates();
    }

    function allowAccess() {
      return (AuthService.isAuthenticated() && AuthService.isAuthorized(CRDS_TOOLS_CONSTANTS.SECURITY_ROLES.ServeSignupTool));
    }

    function cancel() {
      $window.close();
    }

    function isFrequencyOnce() {
      if (vm.selectedFrequency) {
        return (vm.selectedFrequency.value === 0);
      }
      return false;
    }

    function isFrequencyMoreThanOnce() {
      if (vm.selectedFrequency) {
        return (vm.selectedFrequency.value > 0);
      }
      return false;
    }

    function openDatePicker($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();
      vm[opened] = true;
    }

    function parseDate(stringDate) {
      var m = moment(stringDate);

      if (!m.isValid()) {
        var dateArr = stringDate.split('/');
        var dateStr = dateArr[2] + ' ' + dateArr[0] + ' ' + dateArr[1];
        // https://github.com/moment/moment/issues/1407
        // moment("2014 04 25", "YYYY MM DD"); // string with format
        m = moment(dateStr, 'YYYY MM DD');

        if (!m.isValid()) {
          //throw error
          throw new Error('Parse Date Failed Moment Validation');
        }
      }
      $log.debug('date: ' + m.format('X'));
      return m.format('X');
    }

    function populateDates() {
      ServeOpportunities.AllOpportunityDates.query(
        { 'id': vm.params.recordId }, function(retVal) {
        _.each(retVal, function(d) {
          var dateNum = Number(d * 1000);
          var m = moment(dateNum);
          vm.eventDates.push(m.format('MM/DD/YYYY'));
        });
        vm.fromDt = _.first(vm.eventDates);
        vm.toDt = _.last(vm.eventDates);
      });
    }

    function saveRsvp(validForm) {
      if (!validForm) {
        return;
      }

      _.each(vm.participants, function(participant) {
        var saveRsvp = new ServeOpportunities.SaveRsvp();
        saveRsvp.contactId = participant.contactId;
        saveRsvp.opportunityId = vm.params.recordId;
        saveRsvp.opportunityIds = [ vm.params.recordId ];
        saveRsvp.eventTypeId = vm.group.eventTypeId;
        if (vm.selectedFrequency.value === 0) {
          saveRsvp.endDate = parseDate(vm.selectedEvent);
          saveRsvp.startDate = parseDate(vm.selectedEvent);
        } else {
          saveRsvp.endDate = parseDate(vm.toDt);
          saveRsvp.startDate = parseDate(vm.fromDt);
        }
        saveRsvp.signUp = vm.attending;
        saveRsvp.alternateWeeks = (vm.selectedFrequency.value === 2);
        saveRsvp.$save(function(saved) {
          $window.close();
        }, function(err) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        });
      });
    }

    function showError() {
      return vm.params.selectedCount > 1 || vm.params.recordDescription === undefined || vm.params.recordId === '-1';
    }
  }

})();
