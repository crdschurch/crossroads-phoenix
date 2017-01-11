import crdsMultiCheckBoxCombo from './crdsMultiCheckBoxCombo';
import zipCodeValidator from './zipCodeValidator';
import crdsBoldCheckBox from './crdsBoldCheckBox';
import crdsProfilePicture from './crdsProfilePicture';
import phoneNumberValidator from './phoneNumberValidator';

function formlyTypes(ngModule) {
  crdsMultiCheckBoxCombo(ngModule);
  zipCodeValidator(ngModule);
  crdsBoldCheckBox(ngModule);
  crdsProfilePicture(ngModule);
  require('./crdsTimePicker')(ngModule);
  require('./crdsDatePicker')(ngModule);
  require('./crdsInput')(ngModule);
  require('./crdsCheckbox')(ngModule);
  require('./crdsMultiCheckbox')(ngModule);
  require('./crdsRadio')(ngModule);
  require('./crdsRadioDesc')(ngModule);
  require('./crdsSelect')(ngModule);
  require('./crdsTextArea')(ngModule);
  phoneNumberValidator(ngModule);
}

export default formlyTypes;
