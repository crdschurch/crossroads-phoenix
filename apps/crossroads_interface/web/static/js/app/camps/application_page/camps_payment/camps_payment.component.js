import template from './camps_payment.html';
import controller from './camps_payment.controller';
import { getCampProductInfo, checkApplicationExpiration } from '../../camps.resolves';

const CampsPayment = {
  bindings: {},
  template,
  controller,
  resolve: [
    getCampProductInfo,
    checkApplicationExpiration
  ]
};

export default CampsPayment;
