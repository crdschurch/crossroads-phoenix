import ChildcareDashboardGroupController from './childcareDashboardGroup.controller';

let ChildcareGroup = {
  bindings: {
    communityGroup: '=',
    eventDate: '=',
    cancelled: '='
  },
  templateUrl: 'childcare_group/childcareGroup.html',
  controller: ChildcareDashboardGroupController,
  controllerAs: 'childcareGroup'
};

export default ChildcareGroup;
