import MedicalInfoController from './medical_info.controller';
import MedicalInfoTemplate from './medical_info.html';
import { getCampMedical, checkApplicationExpiration } from '../../camps.resolves';

const MedicalInfo = {
  bindings: {},
  template: MedicalInfoTemplate,
  controller: MedicalInfoController,
  resolve: [getCampMedical, checkApplicationExpiration]
};

export default MedicalInfo;
