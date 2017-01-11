import ApplicationPage from './application_page.component';
import constants from '../../constants';
import { registerResolve } from './resolve_registry';

// Camper Info
import CamperInfoComponent from './camper_info/camper_info.component';
import CamperInfoForm from './camper_info/camper_info_form.service';

// Emergency Contact Info
import EmergencyContactComponent from './emergency_contact_info/emergency_contact.component';
import EmergencyContactForm from './emergency_contact_info/emergency_contact_form.service';

// Medical Info
import MedicalInfoComponent from './medical_info/medical_info.component';
import MedicalInfoForm from './medical_info/medical_info_form.service';
import campMedicineFormlyConfig from './medical_info/camp_medicines.formly';
import './medical_info/camp_medicines.html';

// Camp Waivers
import CampWaiversComponent from './camp_waivers/camp_waivers.component';

// Product Summary
import ProductSummaryComponent from './product_summary/product_summary.component';
import ProductSummaryForm from './product_summary/product_summary_form.service';

// Payment
import CampsPayment from './camps_payment/camps_payment.component';

// Camps Full
import CampsFullComponent from './camps_full/camps_full.component';

export default angular.module(constants.MODULES.CAMPS_APPLICATION_PAGE, [
  constants.MODULES.CORE,
  constants.MODULES.COMMON])
  .component('camperInfo', CamperInfoComponent)
  .component('campsApplicationPage', ApplicationPage)
  .component('campsFull', CampsFullComponent)
  .component('emergencyContact', EmergencyContactComponent)
  .component('campMedicalInfo', MedicalInfoComponent)
  .component('campWaivers', CampWaiversComponent)
  .component('medicalInfo', MedicalInfoComponent)
  .component('productSummary', ProductSummaryComponent)
  .component('campsPayment', CampsPayment)
  .service('ProductSummaryForm', ProductSummaryForm)
  .service('MedicalInfoForm', MedicalInfoForm)
  .service('EmergencyContactForm', EmergencyContactForm)
  .service('CamperInfoForm', CamperInfoForm)
  .config(campMedicineFormlyConfig)
  .run(() => {
    registerResolve('camp-waivers', CampWaiversComponent.resolve);
    registerResolve('camper-info', CamperInfoComponent.resolve);
    registerResolve('medical-info', MedicalInfoComponent.resolve);
    registerResolve('product-summary', ProductSummaryComponent.resolve);
    registerResolve('camps-payment', CampsPayment.resolve);
    registerResolve('emergency-contact', EmergencyContactComponent.resolve);
  })
  .name;
