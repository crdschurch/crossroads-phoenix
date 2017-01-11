import requestChildcareComponent from './requestChildcare.component';
import RequestChildcareService from './requestChildcare.service';
import CONSTANTS from 'crds-constants';

angular.module(CONSTANTS.MODULES.MPTOOLS)
    .directive('requestChildcare', requestChildcareComponent)
    .service('RequestChildcareService', RequestChildcareService)
    ;

require('./requestChildcare.html');
