import CONSTANTS from 'constants';
import {SearchFilter, SearchFilterValue} from './searchFilter'; 

class TimeRange {
  constructor(beginTime, endTime) {
    this.beginTime = moment(beginTime, 'HH:mm:ss');
    this.endTime = moment(endTime, 'HH:mm:ss');
  }

  isWithinTimeRange(meetingTime) {
    let m = moment(meetingTime, 'HH:mm:ss');
    // inclusive match on begin and end time - can use inclusive match on moment.isBetween() if we update to 2.13 or higher
    // http://momentjs.com/docs/#/query/is-between/
    return m.isSameOrAfter(this.beginTime) && m.isSameOrBefore(this.endTime);
  }

  toString() {
    return `${this.beginTime.format('HHmm')}-${this.endTime.format('HHmm')}`;
  }
}

function matchingFunction(result) {
    // Guard against errors if group has no meeting time set.  Shouldn't happen, but just in case...
    if(result.meetingTime === undefined) {
      return false;
    }

    let selectedMeetingTime = this.getSelectedValues();
    
    let filtered = selectedMeetingTime.filter((v) => {
      return v.getValue().isWithinTimeRange(result.meetingTime);
    });

    return filtered !== undefined && filtered.length > 0;
  }


export default class MeetingTimeFilter extends SearchFilter {
  constructor(filterName, selectedFilters) {
    if (selectedFilters == null || selectedFilters == undefined)
      selectedFilters="";
    let selectedArray = selectedFilters.split(',');
    let mornSelected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == 'Mornings (before noon)'.toUpperCase()}) != -1;
    let noonSelected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == 'Afternoons (12 - 5pm)'.toUpperCase()}) != -1;
    let eveningSelected = _.findIndex(selectedArray, (s) => { return s.toUpperCase() == 'Evenings (after 5pm)'.toUpperCase()}) != -1;

    let filterValues = [
      new SearchFilterValue('Mornings (before noon)', new TimeRange('00:00:00', '11:59:59'), mornSelected),
      new SearchFilterValue('Afternoons (12 - 5pm)', new TimeRange('12:00:00', '17:00:00'), noonSelected),
      new SearchFilterValue('Evenings (after 5pm)', new TimeRange('17:00:01', '23:59:59'), eveningSelected)
    ];

    super(filterName, filterValues, matchingFunction, CONSTANTS.GROUP.SEARCH_FILTERS_QUERY_PARAM_NAMES.MEETING_TIME);
  }

}
