import EmergencyContactController from './emergency_contact.controller';
import EmergencyContactTemplate from './emergency_contact.html';

import { checkApplicationExpiration } from '../../camps.resolves';

const EmergencyContact = {
  bindings: {},
  template: EmergencyContactTemplate,
  controller: EmergencyContactController,
  resolve: [
    checkApplicationExpiration
  ]
};

export default EmergencyContact;
