import controller  from './requestChildcare.controller';

RequestChildcareComponent.$inject = [ ];

function RequestChildcareComponent() {

  let requestChildcareComponent = {
    restrict: 'E',
    templateUrl: 'request_childcare/requestChildcare.html',
    controller: controller,
    controllerAs: 'request',
    bindToController: true
  };

  return requestChildcareComponent;

}
export default RequestChildcareComponent;
