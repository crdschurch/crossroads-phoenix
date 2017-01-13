import CONSTANTS from 'crds-constants';
import {SearchFilter, SearchFilterValue} from './searchFilter';

function matchingFunction(result) {
  // Guard against errors if group has no age ranges.  Shouldn't happen, but just in case...
  if(!result.ageRange || !Array.isArray(result.ageRange)) {
    return false;
  }
  
  let selectedAgeRanges = this.getSelectedValues();

  let filtered = result.ageRange.filter((a) => {
    return selectedAgeRanges.find((s) => { return s.getValue() === a.attributeId; }) !== undefined;
  });

  return filtered !== undefined && filtered.length > 0;
}

export default class AgeRangeFilter extends SearchFilter {
  constructor(filterName, groupService, selectedFilters) {
    super(filterName, [], matchingFunction, CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES.AGE);

    if (selectedFilters == null || selectedFilters == undefined)
      selectedFilters = "";
    let selectedArray = selectedFilters.split(',');

    groupService.getAgeRanges().then(
      (data) => {
        this.getValues().push.apply(this.getValues(), data.attributes.map((a) => {
          let selected = false;
          if (a.name)
            selected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == a.name.toUpperCase() }) != -1;
          return new SearchFilterValue(a.name, a.attributeId, selected);
        }));
      },
      (err) => {
        // TODO what happens on error? (could be 404/no results, or other error)
      }
    ).finally(
      () => {
    });
  }


}
