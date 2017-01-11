import AgeRangeFilter from './filter_impl/ageRange.filter';
import CategoryFilter from './filter_impl/category.filter';
import KidsWelcomeFilter from './filter_impl/kidsWelcome.filter';
import LocationFilter from './filter_impl/location.filter';
import GroupTypeFilter from './filter_impl/groupType.filter';
import MeetingDayFilter from './filter_impl/meetingDay.filter';
import MeetingTimeFilter from './filter_impl/meetingTime.filter';
import FrequencyFilter from './filter_impl/frequency.filter';
import LeadersSiteFilter from './filter_impl/leadersSite.filter';
import FilterGroup from './filter_impl/filterGroup';

const APPLY_FILTER_DEBOUNCE = 750;

export default class GroupSearchResultsController {
  /*@ngInject*/
  constructor(GroupService, CreateGroupService, $state, $log, $rootScope, $location) {
    this.groupService = GroupService;
    this.createGroupService = CreateGroupService;
    this.expanded = false;
    this.allFilters = undefined;
    this.expandedFilter = null;
    this.$rootScope = $rootScope;
    this.log = $log;
    //this is dumb, but we need a way to know when this
    //is the first run through of _internalApplyFilters 
    //because it will wipe out the parameters otherwise
    this.firstRun = true;
    this.$location = $location;

    this.applyFilters = _.debounce(this._internalApplyFilters, APPLY_FILTER_DEBOUNCE);
    this.state = $state;
  }

  $onInit() {
    this.initializeFilters();
  }

  $onChanges(allChanges) {
    this.searchResults = allChanges.searchResults.currentValue;
    this.applyFilters();
  }

  initializeFilters() {
    this.allFilters = new FilterGroup('All Filters', [
      new AgeRangeFilter('Age Range', this.groupService, this.selectedFilters.age),
      new CategoryFilter('Category', this.groupService, this.selectedFilters.category),
      new GroupTypeFilter('Group Type', this.groupService, this.selectedFilters.type),
      new KidsWelcomeFilter('Kids Welcome', this.selectedFilters.kids),
      new LocationFilter('Location', this.selectedFilters.grouplocation),
      new FilterGroup('Day / Time / Frequency', [
        new MeetingDayFilter('Day', this.groupService, this.selectedFilters.day),
        new MeetingTimeFilter('Time', this.selectedFilters.time),
        new FrequencyFilter('Frequency', this.createGroupService, this.selectedFilters.frequency),
      ]),
      new LeadersSiteFilter('Leaders Site', this.groupService, this.selectedFilters.site),
    ], true);
  }

  _internalApplyFilters() {
    // I really don't like having to do this (checking if it is the first run)
    // but you have to or it will overwrite the parameters that are passed in
    // because when it get constructed it doesn not contain all the parameters
    if (!this.firstRun) {
      let stateParams = this._reconstructUrlParams();
      this.state.go(this.state.current, stateParams, {location: true, inherit:true, notify:false})
    }

    let settings = {
      dataset: this.searchResults.filter((r) => {
        for (let i = 0; i < this.allFilters.getValues().length; i++) {
          if (!this.allFilters.getValues()[i].matches(r)) {
            return false;
          }
        }
        return true;
      })
    };
    
    angular.extend(this.tableParams.settings(), settings);
    this.tableParams.reload();
    this.firstRun = false;
  }

  clearFilters() {
    this.allFilters.clear();
    this.applyFilters();
  }

  _reconstructUrlParams() {
    //get the params object of all the filters (this includes filters with no filter
    //values selected -- this enables us to set filter values that have been previously used
    //but are now deselected to null)
    let params = this.allFilters.buildQuery();
    //compare current old URL params with all the possible filter params
    //to figure out which ones are NOT filter params, so you can 
    //keep those.
    _.forOwn(this.state.params, (value, key) => {
      if (value !== null) {
        let found = false
        _.forEach(this.allFilters.getAllQueryParamNames(), (filterPN) => {
          if (key.toUpperCase() == filterPN.toUpperCase())
            found = true;
        });
        //add old NON filter params to the new params object so we have the complete
        //picture of current state params
        if (!found) {
          params[key] = value;
        }
      }
    });
    return params;
  }

  clearFilter(filter) {
    filter.clear();
    this.applyFilters();
  }

  getCurrentFilters() {
    return this.allFilters.getCurrentFilters();
  }

  hasFilters() {
    return this.allFilters.hasFilters();
  }

  openFilters() {
    this.expanded = true;
    this.expandedFilter = null;
  }

  openFilter(filter) {
    this.expanded = true;
    this.expandedFilter = this._getFilter(filter);
  }

  closeFilters() {
    this.expanded = false;
  }

  toggleFilter(filter) {
    if (this.expandedFilter === this._getFilter(filter)) {
      this.expandedFilter = null;
    } else {
      this.expandedFilter = this._getFilter(filter);
    }
  }

  isOpenFilter(filter) {
    return this.expandedFilter === this._getFilter(filter);
  }

  _getFilter(filter) {
    return filter.belongsToFilterGroup() ? filter.getFilterGroup() : filter;
  }
}
