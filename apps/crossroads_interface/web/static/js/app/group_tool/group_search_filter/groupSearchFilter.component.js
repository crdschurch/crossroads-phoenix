import controller from './groupSearchFilter.controller';

GroupSearchFilterComponent.$inject = [];

export default function GroupSearchFilterComponent() {

    let groupSearchFilterComponent = {
        restrict: 'E',
        bindings: {
            tableParams: '<',
            searchResults: '<',
            selectedFilters: '<'
        },
        templateUrl: 'group_search_filter/groupSearchFilter.html',
        controller: controller,
        controllerAs: 'groupSearchFilter',
        bindToController: true
    };

    return groupSearchFilterComponent;
}