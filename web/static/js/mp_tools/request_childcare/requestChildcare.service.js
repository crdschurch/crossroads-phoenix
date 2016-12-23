class RequestChildcareService {
  /*@ngInject*/ 
  constructor($log, LookupService, $rootScope, $resource) {
    this.lookupService = LookupService;
    this.log = $log;
    this.rootScope = $rootScope;
    this.resource = $resource;
  }

  getChildcareRequest(requestId, success, error) {
    this.requestData = this.resource(__API_ENDPOINT__ + 'api/childcare/getrequest/:requestId');
    return this.requestData.get({ requestId }, success, error);
  }

  getCongregations() {
    return this.lookupService.ChildcareLocations.query((data) => {
      return data;
    },

    (err) => {
      this.log.error(`Unable to get the list of Congregations: ${err.status} - ${err.statusText}`);
      return [];
    });
  }

  getMinistries() {
    return this.lookupService.Ministries.query((data) => {
      return data;
    },
    
    (err) => {
      this.log.error(`Unable to get the list of Congregations: ${err.status} - ${err.statusText}`);
      return [];
    });
  }

  getGroups(congregationId, ministryId) {
    return this.lookupService.GroupsByCongregationAndMinistry
      .query({ congregationId, ministryId }, (data) => {
        return data;
      },

      (err) => {
        this.log.error('Unable to get groups');
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.noGroupsAvailable);
        return [];
      });
  }

  getPreferredTimes(congregationId) {
    return this.lookupService.ChildcareTimes
    .query({congregationId}, (data) => {
      return data;   
    },

    (err) => {
      this.log.error('Unable to get childcare times');
      return [];
    });
  }

  saveRequest(dto) {
    this.saveRequest = this.resource(__API_ENDPOINT__ + 'api/childcare/request');
    return this.saveRequest.save(dto);
  }

  updateRequest(dto) {
    this.updateRequest = this.resource(__API_ENDPOINT__ + 'api/childcare/updaterequest');
    return this.updateRequest.save(dto);
  }
}

export default RequestChildcareService;
