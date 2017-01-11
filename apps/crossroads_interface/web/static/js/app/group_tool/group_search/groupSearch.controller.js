
import Address from '../model/address';

export default class GroupSearchController {
  /*@ngInject*/
  constructor(AddressValidationService, $state, $rootScope) {
    this.addressValidationService = AddressValidationService;
    this.state = $state;
    this.search = {};
    this.processing = false;
    this.rootScope = $rootScope;
  }

  submit(form) {
    let valid = true;
    let params = {};
    if (this.state.params){
      params = this.state.params;
    }
    if (this.search.location && this.search.location.length > 0) {
      this.processing = true;
      valid = false;
      this.addressValidationService.validateAddressString(this.search.location).then((data) => {
        let address = new Address(data);
        this.search.location = address.toSearchString();
        valid = true;
      }, (err) => {
        valid = false;
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolSearchInvalidAddressGrowler);
      }).finally(() => {
        this.processing = false;
        form.location.$setValidity('pattern', valid);
        if (valid) {
          params['query'] = this.search.query;
          params['location'] = this.search.location;
          this.state.go('grouptool.search-results', params);
        }
      });
    } else {
      params['query'] = this.search.query;
      params['location'] = this.search.location;
      this.state.go('grouptool.search-results', params);
    }
  }
}
