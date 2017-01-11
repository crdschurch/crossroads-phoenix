import controller  from './childcareDecision.controller';

function ChildcareDecisionComponent() {

    let ChildcareComponent = {
        restrict: 'E',
        templateUrl: 'childcare_decision/childcareDecision.html',
        controller: controller,
        controllerAs: 'decision',
        bindToController: true
    };

    return ChildcareComponent;

}
export default ChildcareDecisionComponent;

