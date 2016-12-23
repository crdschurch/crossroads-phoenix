class ChildcareDecisionService {
  /*@ngInject*/
  constructor($log, $rootScope, $resource) {
    this.log = $log;
    this.rootScope = $rootScope;
    this.resource = $resource;
    this.approve = $resource(__API_ENDPOINT__ + 'api/childcare/request/approve/:requestId');
    this.reject = $resource(__API_ENDPOINT__ + 'api/childcare/request/reject/:requestId');
    this.requestData = $resource(__API_ENDPOINT__ + 'api/childcare/getrequest/:requestId');
    this.requestDates = $resource(__API_ENDPOINT__ + 'api/childcare/getrequestDates/:requestId');
  }

  getChildcareRequest(requestId, success, error) {
    return this.requestData.get({requestId}, success, error);
  }

  rejectRequest(requestId, dto, success, error) {
    return this.reject.save({requestId}, dto, success, error);
  }

  saveRequest(requestId, dto, success, error) {
    return this.approve.save({requestId}, dto, success, error);
  }
}

export default ChildcareDecisionService;
