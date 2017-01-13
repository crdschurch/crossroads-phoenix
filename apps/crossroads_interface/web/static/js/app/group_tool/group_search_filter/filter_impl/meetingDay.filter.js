import CONSTANTS from 'crds-constants';
import { SearchFilter, SearchFilterValue } from './searchFilter';

function matchingFunction(result) {
  // Guard against errors if group has no days.  Shouldn't happen, but just in case...
  if (!result.meetingDay && !result.meetingTimeFrequency) {
    return false;
  }

  let selectedMeetingDays = this.getSelectedValues();

  let filtered = selectedMeetingDays.filter((a) => {
    return a.getValue() === result.meetingDay || a.getValue() === result.meetingTimeFrequency;
  });
  return filtered !== undefined && filtered.length > 0;
}


export default class MeetingDayFilter extends SearchFilter {
  constructor(filterName, groupService, selectedFilters) {
    super(filterName, [], matchingFunction, CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES.MEETING_DAY);

    if (selectedFilters == null || selectedFilters == undefined)
      selectedFilters = "";
    let selectedArray = selectedFilters.split(',');

    groupService.getDaysOfTheWeek().then(
      (data) => {
        data = _.sortBy(data, 'dp_RecordID');
        this.getValues().push.apply(this.getValues(), data.map((a) => {
          let selected = false;
          if (a.dp_RecordName)
            selected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == a.dp_RecordName.toUpperCase() }) != -1;

          return new SearchFilterValue(a.dp_RecordName, a.dp_RecordName, selected);
        }));
        this.getValues().push(new SearchFilterValue(
          'Flexible',
          'Flexible Meeting Time',
          _.findIndex(selectedArray, (s) => { return s.toUpperCase() == 'FLEXIBLE' }) != -1, undefined,
          'groupToolFlexibleMeetingFilterHelpText'
        ));
      },
      (err) => {
        // TODO what happens on error? (could be 404/no results, or other error)
      }
    ).finally(
      () => {
      });
  }

  
}
