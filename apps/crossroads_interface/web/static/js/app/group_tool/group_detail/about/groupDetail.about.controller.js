
export default class GroupDetailAboutController {
  /*@ngInject*/
  constructor(GroupService, ImageService, $state, $stateParams, $log, $cookies, $location, $rootScope) {
    this.groupService = GroupService;
    this.imageService = ImageService;
    this.state = $state;
    this.stateParams = $stateParams;
    this.log = $log;
    this.cookies = $cookies;
    this.location = $location;
    this.rootScope = $rootScope;

    this.defaultProfileImageUrl = this.imageService.DefaultProfileImage;
    this.ready = false;
    this.error = false;
    this.showFooter = false;
    this.popoverHtml = '<div class="label label-success">Copied to clipboard!</div>';

    this.forInvitation = (this.forInvitation === undefined || this.forInvitation === null) ? false : this.forInvitation;
    this.forSearch = (this.forSearch === undefined || this.forSearch === null) ? false : this.forSearch;
  }

  $onInit() {
    this.groupId = this.state.params.groupId || this.data.groupId;

    this.showFooter = this.state.params.groupId !== undefined && this.state.params.groupId !== null;
    if (this.showFooter) {
      this.groupService.getGroup(this.groupId).then((data) => {
        this.data = data;
        this.setGroupImageUrl();
        if (this.showShareButtons == null) {
          this.showShareButtons = data.availableOnline;
        }
      },
        (err) => {
          this.log.error(`Unable to get group details: ${err.status} - ${err.statusText}`);
          this.error = true;
        }).finally(() => {
          this.ready = true;
        });
    } else if (this.data != null) {
      this.setGroupImageUrl();
      this.ready = true;
    } else {
      // TODO map object posted from create into data object, then call this.setGroupImageUrl()
      // this.setGroupImageUrl();
      this.ready = true;
    }

    // Set show visibility flag
    this.showVisibility = !!this.stateParams.showVisibility;

    // If the component is allowed to show visibility or the footer will be rendered with Leader buttons,
    // Determine if the logged in user is the leader of this group IF not already set as an input binding
    if (this.isLeader === undefined && (this.showFooter || this.showVisibility)) {
      this.groupService.getIsLeader(this.groupId).then((isLeader) => {
        this.isLeader = isLeader;
      });
    }
  }

  setGroupImageUrl() {
    const primaryContactId = this.data.contactId;
    this.data.primaryContact = {
      imageUrl: `${this.imageService.ProfileImageBaseURL}${primaryContactId}`,
      contactId: primaryContactId
    };
  }

  // this is not efficient, gets called every time the digest cycle runs
  getAddress() {
    if (!this.ready) {
      return undefined;
    }

    if (!this.data.hasAddress()) {
      return 'Online';
    }

    if (!this.userInGroup()) {
      return `${this.data.address.city}, ${this.data.address.state} ${this.data.address.zip}`;
    } else {
      return this.data.address.toString();
    }
  }

  groupExists() {
    if (this.groupId !== undefined && this.groupId !== null) {
      return true;
    }
    else {
      return false;
    }
  }

  userInGroup() {
    if (this.data) {
      return this.data.participantInGroup(this.cookies.get('userId'));
    }
    return false;
  }

  goToEdit() {
    this.state.go('grouptool.edit', { groupId: this.state.params.groupId });
  }

  goToEnd() {
    this.state.go('grouptool.end-group', { groupId: this.state.params.groupId });
  }

  shareUrl() {
    return `${this.location.protocol()}://${this.location.host()}/groups/search/results?id=${this.groupId}`;
  }

  onShareSuccess() {
    this.rootScope.$emit('notify', this.rootScope.MESSAGES.copiedToClipBoard);
  }

  onShareError() {
    this.location.path('/groups/search/results').search('id', this.groupId);
    this.rootScope.$emit('notify', this.rootScope.MESSAGES.copiedToClipBoardError);
  }
}