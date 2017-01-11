import CONSTANTS from 'crds-constants';
import {SearchFilter, SearchFilterValue} from './searchFilter'; 

export default class LocationFilter extends SearchFilter {
  constructor(filterName, selectedFilters) {

    if (selectedFilters == null || selectedFilters == undefined)
      selectedFilters="";
    let selectedArray = selectedFilters.split(',');
    let inPersonSelected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == 'IN PERSON'}) != -1;
    let onlineSelected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == 'ONLINE'}) != -1

    let filterValues = [
      new SearchFilterValue('In Person', true, inPersonSelected),
      new SearchFilterValue('Online', false, onlineSelected)
    ];

    super(filterName, filterValues, this._matchingFunction, CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES.GROUP_LOCATION);
  }

  _matchingFunction(result) {
    let selectedOnline = this.getSelectedValues();
    
    let filtered = selectedOnline.filter((v) => {
      return result.hasAddress() === v.getValue(); 
    });

    return filtered !== undefined && filtered.length > 0;
  }
}