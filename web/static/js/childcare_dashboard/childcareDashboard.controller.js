/*@ngInject*/
class ChildcareDashboardController {
    constructor(ChildcareDashboardService){
      this.childcareService = ChildcareDashboardService;
      this.childcareObj = this.childcareService.getChildcareDates();
    }

    isGroupsEmpty() {
      return this.childcareObj['childcareDates'].length < 1;
    }

    isError() {
      return this.childcareService.headOfHouseholdError;
    }

  }
  export default ChildcareDashboardController;
