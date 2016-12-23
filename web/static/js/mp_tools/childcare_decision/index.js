import childcareDecisionComponent from './childcareDecision.component';
import ChildcareDecisionService from './childcareDecision.service';
import DecisionModalController from './decisionModal.controller';
import CONSTANTS from 'crds-constants';

angular.module(CONSTANTS.MODULES.MPTOOLS)
    .directive('childcareDecision', childcareDecisionComponent)
    .controller('DecisionModalController', DecisionModalController)
    .service('ChildcareDecisionService', ChildcareDecisionService)
;
require('./decisionModal.html');
require('./childcareDecision.html');
