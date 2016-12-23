import controller from './groupDetail.requests.controller';

GroupDetailRequestsComponent.$inject = [];

export default function GroupDetailRequestsComponent() {

  let groupDetailRequestsComponent = {
    restrict: 'E',
    templateUrl: 'requests/groupDetail.requests.html',
    controller: controller,
    controllerAs: 'groupDetailRequests',
    bindToController: true
  };

  return groupDetailRequestsComponent;

}