import CONSTANTS from 'crds-constants';
import {SearchFilter, SearchFilterValue} from './searchFilter';

export default class LeadersSiteFilter extends SearchFilter {
  constructor(filterName, groupService, selectedFilters) {
    super(filterName, [], this._matchingFunction, CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES.LEADER_SITE);

    if (selectedFilters == null || selectedFilters == undefined)
      selectedFilters = "";
    let selectedArray = selectedFilters.split(',');

    groupService.getSites().then(
      (data) => {
        data = _.sortBy( data, 'dp_RecordID' );
        this.getValues().push.apply(this.getValues(), data.map((a) => {
          let selected = false;
          if (a.dp_RecordName)
            selected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == a.dp_RecordName.toUpperCase() }) != -1;
          return new SearchFilterValue(a.dp_RecordName, a.dp_RecordID, selected);
        }));
      },
      (/*err*/) => {
        // TODO what happens on error? (could be 404/no results, or other error)
      }).finally(
        () => {
      });    
  }

  _matchingFunction(result) {
    // Guard against errors if group has no age ranges.  Shouldn't happen, but just in case...
    if(!result.leaders() || !Array.isArray(result.leaders())) {
      return false;
    }

    let selectedSites = this.getSelectedValues();

    let filtered = result.leaders().filter((a) => {
      return selectedSites.find((s) => { return s.getName() === a.congregation; }) !== undefined;
    });

    return filtered !== undefined && filtered.length > 0;
  }
}
