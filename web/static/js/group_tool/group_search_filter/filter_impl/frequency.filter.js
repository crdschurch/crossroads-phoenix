import CONSTANTS from 'crds-constants';
import {SearchFilter, SearchFilterValue} from './searchFilter';

export default class FrequencyFilter extends SearchFilter {
    constructor(filterName, createGroupService, selectedFilters) {
      super(filterName, [], this._matchingFunction, CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES.MEETING_FREQUENCY);

      if (selectedFilters == null || selectedFilters == undefined)
      selectedFilters = "";
      let selectedArray = selectedFilters.split(',');

      let frequencies = createGroupService.getMeetingFrequencies();
      frequencies = _.sortBy(frequencies, 'meetingFrequencyId' );

      this.getValues().push.apply(this.getValues(), frequencies.map((a) => {
        let selected = false;
        if (a.meetingFrequencyDesc)
            selected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == a.meetingFrequencyDesc.toUpperCase() }) != -1;
        return new SearchFilterValue(a.meetingFrequencyDesc, a.meetingFrequencyId, selected);
      }));        
    }

    _matchingFunction(result) {
        // Guard against errors if group has no frequency.  Shouldn't happen, but just in case...
        if(!result.meetingFrequencyID) {
            return false;
        }

        let selectedMeetingFrequencies = this.getSelectedValues();

        let filtered = selectedMeetingFrequencies.filter((a) => {
            return a.value === result.meetingFrequencyID;
        });

        return filtered !== undefined && filtered.length > 0;
    }
}
