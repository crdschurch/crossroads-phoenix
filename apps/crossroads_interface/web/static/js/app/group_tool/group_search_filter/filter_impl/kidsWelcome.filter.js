import CONSTANTS from 'crds-constants';
import {SearchFilter, SearchFilterValue} from './searchFilter'; 

function matchingFunction(result) {
  // Guard against errors if group has no kids welcome flag set.  Shouldn't happen, but just in case...
  if(result.kidsWelcome === undefined) {
    return false;
  }

  let selectedKidsWelcome = this.getSelectedValues();
  
  let filtered = selectedKidsWelcome.filter((v) => {
    return result.kidsWelcome === v.getValue(); 
  });

  return filtered !== undefined && filtered.length > 0;
}

export default class KidsWelcomeFilter extends SearchFilter {
  constructor(filterName, selectedFilters) {
    
    if (selectedFilters == null || selectedFilters == undefined)
      selectedFilters="";
    let selectedArray = selectedFilters.split(',');
    let yesSelected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == 'YES'}) != -1;
    let noSelected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == 'NO'}) != -1

    let filterValues = [
      new SearchFilterValue('Yes', true, yesSelected),
      new SearchFilterValue('No', false, noSelected)
    ];

    super(filterName, filterValues, matchingFunction, CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES.KIDS_WELCOME);
  }

}
