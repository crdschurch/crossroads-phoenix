import CONSTANTS from 'crds-constants';
import {SearchFilter, SearchFilterValue} from './searchFilter';

export default class CategoryFilter extends SearchFilter {
  constructor(filterName, groupService, selectedFilters) {
    super(filterName, [], this._matchingFunction, CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES.GROUP_CATEGORY);

    if (selectedFilters == null || selectedFilters == undefined)
      selectedFilters = "";
    let selectedArray = selectedFilters.split(',');

    groupService.getGroupTypeCategories().then(
      (data) => {
        this.getValues().push.apply(this.getValues(), data.map((c) => {
          let selected = false;
          if (c.name)
            selected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == c.name.toUpperCase() }) != -1;
          return new SearchFilterValue(c.name, c.categoryId, selected, c.desc);
        }));
      },
      (/*err*/) => {
        // TODO what happens on error? (could be 404/no results, or other error)
      }).finally(
        () => {
      });
  }

  _matchingFunction(result) {
    // Guard against errors if group has no categories.  Shouldn't happen, but just in case...
    if(!result.categories || !Array.isArray(result.categories)) {
      return false;
    }
    
    let selectedCategories = this.getSelectedValues();

    let filtered = result.categories.filter((c) => {
      return selectedCategories.find((s) => { return s.getValue() === c.categoryId; }) !== undefined;
    });

    return filtered !== undefined && filtered.length > 0;   
  }
}