
export class SearchFilter {
  // Don't instantiate this class directly, subclass it for a specific filter
  /*@ngInject*/
  constructor(filterName, filterValues, matchingFunction, queryParamName) {
    this.filterName = filterName;
    this.filterValues = filterValues;
    this.matchingFunction = matchingFunction;
    this.queryParamName = queryParamName;
  }

  getName() {
    return this.filterName;
  }

  getFilterName() {
    return _.camelCase(this.getName());
  }

  getQueryParamName() {
    return this.queryParamName;
  }

  getSelectedValues() {
    return this.filterValues.filter((i) => { return i.selected === true; });
  }

  getValues() {
    return this.filterValues;
  }

  matches(result) {
    if (!this.isActive()) {
      return true;
    }
    return this.matchingFunction(result);
  }

  isActive() {
    return this.filterValues.find((i) => { return i.selected === true; }) !== undefined;
  }

  clear() {
    for (let i = 0; i < this.filterValues.length; i++) {
      this.filterValues[i].selected = false;
    }
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

export class SearchFilterValue {
  constructor(name, value, selected, helpTextContentBlockTitle, optionSelectedTextContentBlockTitle) {
    this.name = name;
    this.value = value;
    this.selected = selected;
    this.helpTextContentBlockTitle = helpTextContentBlockTitle;
    this.optionSelectedTextContentBlockTitle = optionSelectedTextContentBlockTitle;
  }

  getName() {
    return this.name;
  }

  getValue() {
    return this.value;
  }

  getValueString() {
    return typeof this.value.toString === 'function' ? this.value.toString() : this.value;
  }

  hasHelpText() {
    return this.helpTextContentBlockTitle != null && this.helpTextContentBlockTitle.length > 0;
  }

  getHelpText() {
    return this.helpTextContentBlockTitle;
  }

  hasOptionSelectedText() {
    return this.optionSelectedTextContentBlockTitle != null && this.optionSelectedTextContentBlockTitle.length > 0;
  }

  getOptionSelectedText() {
    return this.optionSelectedTextContentBlockTitle;
  }

  isSelected() {
    return this.selected !== undefined && this.selected === true;
  }
}