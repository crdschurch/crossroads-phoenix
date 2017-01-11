
export default class FilterGroup {
  constructor(filterName, filters, topLevel) {
    this.filterName = filterName;
    this.filters = filters;

    // Only set parent group if this is not the top-level group
    if (topLevel !== true) {
      this.filters.forEach((f) => {
        f.setFilterGroup(this);
      });
    }
  }

  getName() {
    return this.filterName;
  }


  buildQuery() {
    var query = {};
    _.forEach(this.getAllFilters(), (f) => {
      let filterQueryStringValuesCSV = "";
      _.forEach(f.getSelectedValues(), (fv) => {
        filterQueryStringValuesCSV += fv.name + ',';
      });
      if (filterQueryStringValuesCSV.length > 0)
        query[f.getQueryParamName()] = filterQueryStringValuesCSV.replace(/,\s*$/, "");
      else 
        query[f.getQueryParamName()] = null;
    })
    return query;
  }

  getAllQueryParamNames() {
    let queryParamList = [];

    _.forEach(this.getAllFilters(), (f) => {
      queryParamList.push(f.getQueryParamName());
    });

    return queryParamList;
  }

  getFilterName() {
    return _.camelCase(this.getName());
  }

  getValues() {
    return this.filters;
  }

  getSelectedValues() {
    let selected = [];
    this.filters.forEach((f) => { selected.push.apply(selected, f.getSelectedValues()); });
    return selected;
  }

  getAllValues() {
    let fv = [];
    this.filters.forEach((v) => { fv.push.apply(fv, v.getValues()); });
    return fv;
  }

  getCurrentFilters() {
    let current = [];
    this.filters.forEach((f) => {
      if (f.isActive()) {
        if (f.constructor.name !== 'FilterGroup') {
          current.push(f);
        } else {
          current.push.apply(current, f.getCurrentFilters());
        }
      }
    });
    return current;
  }

  getAllFilters() {
    let filters = [];
    this.filters.forEach((f) => {
      if (f.constructor.name !== 'FilterGroup') {
        filters.push(f);
      } else {
        filters.push.apply(filters, f.getAllFilters());
      }
    });
    return filters;
  }

  matches(result) {
    // A filter group matches a result only if all contained filters match the result
    return this.filters.find((f) => { return f.matches(result) === false; }) === undefined;
  }

  hasFilters() {
    return this.isActive();
  }

  isActive() {
    // A filter group is active if any of the contained filters are active
    return this.filters.find((f) => { return f.isActive() === true; }) !== undefined;
  }

  clear() {
    this.filters.forEach((f) => { f.clear(); });
  }

  belongsToFilterGroup() {
    return this.filterGroup !== undefined;
  }

  setFilterGroup(filterGroup) {
    this.filterGroup = filterGroup;
  }

  getFilterGroup() {
    return this.filterGroup;
  }

  compareTo(other) {
    return this.getName().localeCompare(other.getName());
  }
}