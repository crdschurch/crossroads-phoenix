import CamperInfoController from './camper_info.controller';
import InfoTemplate from './camper_info.html';
import { getCamperInfo, getCampInfo, getShirtSizes } from '../../camps.resolves';

const CamperInfo = {
  bindings: {},
  template: InfoTemplate,
  controller: CamperInfoController,
  controllerAs: 'camperInfo',
  resolve: [
    getCamperInfo,
    getCampInfo,
    getShirtSizes
  ]
};

export default CamperInfo;
