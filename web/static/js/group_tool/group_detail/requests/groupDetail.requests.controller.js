
import CONSTANTS from 'crds-constants';
import GroupInvitation from '../../model/groupInvitation';

export default class GroupDetailRequestsController {
  
  /*@ngInject*/
  constructor(GroupService, $state, $stateParams, $rootScope, $log) {
    this.groupService = GroupService;
    this.state = $state;
    this.rootScope = $rootScope;
    this.log = $log;

    this.groupId = this.state.params.groupId;
    this.ready = false;
    this.error = false;
    this.currentView = $stateParams.view || 'List';
    this.invited = [];
    this.inquired = [];

    this.selectedInquiry = null;
    this.processing = false;
  }

  $onInit() {
    this.getRequests();
  }

  getRequests() {
    this.ready = false;
    this.error = false;

    this.groupService.getInquiries(this.groupId).then((inquiries) => {
      this.inquired = inquiries.filter(function (inquiry) { return inquiry.placed === null || inquiry.placed === undefined; });

      this.groupService.getInvities(this.groupId).then((invitations) => {
        this.invited = invitations;
        this.ready = true;
      },
      (err) => {
        this.rootScope.$emit('notify', `Unable to get group invitations: ${err.status} - ${err.statusText}`);
        this.log.error(`Unable to get group invitations: ${err.status} - ${err.statusText}`);
        this.error = true;
        this.ready = true;
      });
    },
    (err) => {
      this.rootScope.$emit('notify', `Unable to get group inquiries: ${err.status} - ${err.statusText}`);
      this.log.error(`Unable to get group inquiries: ${err.status} - ${err.statusText}`);
      this.error = true;
      this.ready = true;
    });
  }

  approve(inquiry) {
    this.selectedInquiry = inquiry;
    this.selectedInquiry.message = '';
    this.setView('Approve', false);
  }

  submitApprove(person) {
    this.log.info(`Approving inquiry: ${JSON.stringify(person)}`);
    this.processing = true;

    this.groupService.approveDenyInquiry(this.groupId, true, person).then(() => {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolApproveInquirySuccessGrowler);
      this.setView('List', true);
    },
    (err) => {
      this.log.error(`Unable to deny group Inquiry: ${err.status} - ${err.statusText}`);
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolApproveInquiryFailureGrowler);
    }).finally(() => {
      this.processing = false;
    });
  }

  deny(inquiry) {
    this.selectedInquiry = inquiry;
    this.selectedInquiry.message = '';
    this.setView('Deny', false);
  }

  submitDeny(person) {
    this.log.info(`Denying inquiry: ${JSON.stringify(person)}`);
    this.processing = true;

    this.groupService.approveDenyInquiry(this.groupId, false, person).then(() => {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolDenyInquirySuccessGrowler);
      this.setView('List', true);
    },
    (err) => {
      this.log.error(`Unable to deny group Inquiry: ${err.status} - ${err.statusText}`);
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolDenyInquiryFailureGrowler);
    }).finally(() => {
      this.processing = false;
    });
  }

  cancel(inquiry) {
    inquiry.message = undefined;
    this.selectedInquiry = undefined;
    this.setView('List', false);
  }

  setView(newView, refresh) {
    this.currentView = newView;

    if(refresh) {
      this.getRequests();
    }
  }

  listView() {
    return this.currentView === 'List';
  }

  inviteView() {
    return this.currentView === 'Invite';
  }

  approveView() {
    return this.currentView === 'Approve';
  }

  denyView() {
    return this.currentView === 'Deny';
  }

  hasRequests() {
    return this.inquired && this.inquired.length > 0;
  }

  hasInvites() {
    return this.invited && this.invited.length > 0;
  }

  hasRequestsOrInvites() {
    return this.hasRequests() || this.hasInvites();
  }
}