import CampWaiversController from './camp_waivers.controller';
import template from './camp_waivers.html';
import { getCampWaivers, getCamperFamily, getCamperInfo, checkApplicationExpiration } from '../../camps.resolves';

const CampWaiversComponent = {
  bindings: {},
  template,
  controller: CampWaiversController,
  controllerAs: 'campWaivers',
  resolve: [getCampWaivers, getCamperInfo, getCamperFamily, checkApplicationExpiration]
};

export default CampWaiversComponent;
