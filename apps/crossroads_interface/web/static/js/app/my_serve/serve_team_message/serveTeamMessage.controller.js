export default class ServeTeamMessageController {
  /* @ngInject */
  constructor(ServeTeamService, $log, $rootScope, $state) {
    console.debug('Serve Team Message controller');
    this.serveTeamService = ServeTeamService;
    this.processing = false;
    this.selection = null;
    this.individuals = [];
    this.ready = false;
    this.log = $log;
    this.rootScope = $rootScope;
    this.state = $state;
  }

  $onInit() {
    if (this.serveTeamService.isLeader) {
      this.serveTeamService.getTeamDetailsByLeader().then((data) => {
        this.teams = data;
      }).catch((err) => {
        this.log.debug("unable to retrieve teams")
      }).finally(() => {
        this.ready = true;
      });
      this.teamPeople = this.serveTeamService.getAllTeamMembersForLoggedInLeader().then((data) => {
        this.teamPeople = data;
      }).catch((err) => {
        this.log.debug("unable to retrieve team members.")
      });
      this.tinymceOptions = {
        resize: false,
        height: 300,
        plugins: 'paste link legacyoutput textcolor',
        valid_elements: 'ol,ul,li,p,br,strong/b,i,em,a[href|target=_blank],p,br',
        toolbar: 'undo redo | fontselect fontsizeselect forecolor backcolor | bold italic underline | alignleft aligncenter alignright | numlist bullist | link',
        menubar: false,
        statusbar: false
      };
    } else {
      this.state.go('serve-signup');
    }
  }

  loadIndividuals($query) {
    return _.filter(this.teamPeople, (person) => {
      return person.displayName.toLowerCase()
        .includes($query.toLowerCase())
    })
  }

  cancel() {
    this.state.go('serve-signup');
  }

  submit(serveMessageForm) {
    // Validate the form - if ok, then invoke the submit callback
    if (!serveMessageForm.$valid) {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      return;
    }
    if (this.selection == -1) {
      this.processing = true;
      this.serveTeamService.sendParticipantsMessage({ Participants: this.individuals, Body: this.email.message, Subject: this.email.subject })
        .then((data) => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.emailSent);
          this.state.go('serve-signup');
        })
        .catch((err) => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.messageSendError);
        })
        .finally(() => {
          this.processing = false;
        });
    } else {
      this.processing = true;
      this.serveTeamService.sendGroupMessage(this.selection, { Body: this.email.message, Subject: this.email.subject })
        .then((data) => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.emailSent);
          this.state.go('serve-signup');
        })
        .catch((err) => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.messageSendError);
        })
        .finally(() => {
          this.processing = false;
        });
    }
  }
}