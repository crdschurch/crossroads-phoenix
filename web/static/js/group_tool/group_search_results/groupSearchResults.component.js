import controller from './groupSearchResults.controller';

GroupSearchResultsComponent.$inject = [];

export default function GroupSearchResultsComponent() {

  let groupSearchResultsComponent = {
    restrict: 'E',
    templateUrl: 'group_search_results/groupSearchResults.html',
    controller: controller,
    controllerAs: 'groupSearchResults',
    bindToController: true
  };

  return groupSearchResultsComponent;
}
