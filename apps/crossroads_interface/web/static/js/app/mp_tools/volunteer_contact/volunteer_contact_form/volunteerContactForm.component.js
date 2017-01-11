(function() {
  'use strict';

  module.exports = VolunteerContactForm;

  VolunteerContactForm.$inject = [
    '$rootScope',
    '$window',
    'Validation',
    'Group',
    'Session',
    'VolunteerContact'
  ];

  function VolunteerContactForm(
    $rootScope,
    $window,
    Validation,
    Group,
    Session,
    VolunteerContact
  ) {
    return {
      restrict: 'E',
      scope: {
        group: '='
      },
      bindToController: true,
      controller: VolunteerContactFormController,
      controllerAs: 'contactForm',
      templateUrl: 'volunteer_contact_form/volunteerContactForm.html'
    };

    function VolunteerContactFormController() {
      var vm = this;
      vm.cancel = cancel;
      vm.data = {}; // the form object
      vm.eventChanged = eventChanged;
      vm.eventChoosen = eventChoosen;
      vm.eventDateTime = eventDateTime;
      vm.formData = {};
      vm.loadingTo = false;
      vm.processing = false;
      vm.recipientsChoosen = recipientsChoosen;
      vm.save = save;
      vm.showEmailForm = showEmailForm;
      vm.showNoParticipants = showNoParticipants;
      vm.validation = Validation;

      function cancel() {
        $window.close();
      }

      function eventChanged() {
        if (vm.formData.event && vm.formData.recipients) {
          vm.loadingTo = true;
          Group.Participants.query({
            groupId: vm.group.groupId,
            eventId: vm.formData.event.eventId,
            recipients: vm.formData.recipients
          },

          function(data) {
            vm.to = _.map(data, function(d) {
              return d.contactId;
            });

            vm.formData.to = _.pluck(data, 'displayName').join('; ');
            vm.loadingTo = false;
          },

          function(err) {
            vm.loadingTo = false;
            console.error(err);
            $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
          });
        } else {
          vm.formData.to = undefined;
          vm.formData.recipients = undefined;
        }
      }

      function eventChoosen() {
        return !_.isEmpty(vm.formData.event);
      }

      function eventDateTime(event) {
        var startDate = moment(event.startDate);
        var endDate = moment(event.endDate);
        var timestamp = _.template('${ date } ${ start } - ${ end }');
        var display = timestamp({
          date: startDate.format('MM/DD/YYYY'),
          start: startDate.format('hh:mmA'),
          end: endDate.format('hh:mmA')
        });
        return display;
      }

      function recipientsChoosen() {
        return !_.isEmpty(vm.formData.recipients);
      }

      function save() {
        if (!vm.data.$valid) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
          return false;
        }

        vm.processing = true;

        var toSend = {
          fromContact: Session.exists('userId'),
          toContacts: vm.to,
          subject: vm.formData.subject,
          body: vm.formData.body
        };

        VolunteerContact.GroupMail.save(toSend, function() {
          vm.processing = false;
          cancel();
        },

        function(err) {
          vm.processing = false;
          console.error(err);
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        });

        return true;
      }

      function showEmailForm() {
        return vm.recipientsChoosen() &&
          !vm.loadingTo &&
          vm.formData.to.length > 0;
      }

      function showNoParticipants() {
        return vm.recipientsChoosen() &&
          !vm.loadingTo &&
          vm.formData.to.length < 1;
      }
    }

  }
})();
