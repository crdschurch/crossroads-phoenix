import controller from './groupSearch.controller';

GroupSearchComponent.$inject = [];

export default function GroupSearchComponent() {

  let groupSearchComponent = {
    restrict: 'E',
    templateUrl: 'group_search/groupSearch.html',
    controller: controller,
    controllerAs: 'groupSearch',
    bindToController: true
  };

  return groupSearchComponent;
}
