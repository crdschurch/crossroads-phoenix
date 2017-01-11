export default class GroupDetailController {
  /*@ngInject*/
  constructor(GroupService, $state, $rootScope) {
    this.groupService = GroupService;
    this.state = $state;
    this.ready = false;
    this.tabs = [];
    this.rootScope = $rootScope;
  }

  $onInit() {
    this.groupService.getIsLeader(this.state.params.groupId).then((isLeader) => {
      this.tabs.push({ title: 'About', active: false, route: 'grouptool.detail.about' });
      this.tabs.push({ title: 'Participants', active: false, route: 'grouptool.detail.participants', class: 'hidden-xs' });

      if(isLeader){
        this.tabs.push({ title: 'Requests', active: false, route: 'grouptool.detail.requests', class: 'hidden-xs' });
      }

      let foundActive = false;
      let currentState = this.state.current.name;
      this.tabs.forEach(function (tab) {
        tab.active = currentState === tab.route;
        if (tab.active) {
          foundActive = true;
        }
      });
      if (!foundActive) {
        this.goToTab(this.tabs[0]);
      }
    }).finally(() => {
      this.ready = true;
    });

    //this handles all the browser navigation and sets the correct selected tab on
    //browser back and forward
    this.rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        if (toState.name == 'grouptool.detail' &&
          (fromState.name.startsWith('grouptool.detail.about') ||
          fromState.name.startsWith('grouptool.detail.participants') ||
          fromState.name.startsWith('grouptool.detail.requests'))){
            event.preventDefault();
            this.state.go('grouptool.mygroups');
        } else if (toState.name.startsWith('grouptool.detail.about') ||
          toState.name.startsWith('grouptool.detail.participants') ||
          toState.name.startsWith('grouptool.detail.requests')) {
          this.tabs.forEach(function (tab) {
            tab.active = toState.name === tab.route;
          });
        } 
    });

  }

  goToTab(tab) {
    tab.active = true;
    this.state.go(tab.route);
  }
}