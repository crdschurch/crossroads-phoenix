import CONSTANTS from 'crds-constants';
import {SearchFilter, SearchFilterValue} from './searchFilter';

export default class GroupTypeFilter extends SearchFilter {
  constructor(filterName, groupService, selectedFilters) {
    super(filterName, [], this._matchingFunction, CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES.GROUP_TYPE);

    if (selectedFilters == null || selectedFilters == undefined)
      selectedFilters = "";
    let selectedArray = selectedFilters.split(',');

    groupService.getGroupGenderMixType().then(
      (data) => {
        this.getValues().push.apply(this.getValues(), data.attributes.map((a) => {
          let selected = false;
          if (a.name)
            selected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == a.name.toUpperCase() }) != -1;
          return new SearchFilterValue(a.name, a.attributeId, selected);
        }));
      },
      (/*err*/) => {
        // TODO what happens on error? (could be 404/no results, or other error)
      }).finally(
        () => {
      });    
  }

  _matchingFunction(result) {
    // Guard against errors if group has no group type.  Shouldn't happen, but just in case...
    if(!result.groupType) {
      return false;
    }
    
    let filtered = this.getSelectedValues().find((v) => {
      return v.getValue() === result.groupType.attributeId; 
    });

    return filtered !== undefined;    
  }
}