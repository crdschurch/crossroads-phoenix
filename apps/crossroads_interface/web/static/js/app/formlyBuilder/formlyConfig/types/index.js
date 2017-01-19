import crdsMultiCheckBoxCombo from './crdsMultiCheckBoxCombo';
import zipCodeValidator from './zipCodeValidator';
import crdsBoldCheckBox from './crdsBoldCheckBox';
import crdsProfilePicture from './crdsProfilePicture';
import phoneNumberValidator from './phoneNumberValidator';
import crdsTimePicker from './crdsTimePicker';
import crdsDatePicker from './crdsDatePicker';
import crdsInput from './crdsInput';
import crdsCheckbox from './crdsCheckbox'
import crdsMultiCheckbox from './crdsMultiCheckbox';
import crdsRadio from './crdsRadio';
import crdsRadioDesc from './crdsRadioDesc';
import crdsSelect from './crdsSelect';
import crdsTextArea from './crdsTextArea';


function formlyTypes(ngModule) {
  crdsMultiCheckBoxCombo(ngModule);
  zipCodeValidator(ngModule);
  crdsBoldCheckBox(ngModule);
  crdsProfilePicture(ngModule);
  crdsTimePicker(ngModule);
  crdsDatePicker(ngModule);
  crdsInput(ngModule);
  crdsCheckbox(ngModule);
  crdsMultiCheckbox(ngModule);
  crdsRadio(ngModule);
  crdsRadioDesc(ngModule);
  crdsSelect(ngModule);
  crdsTextArea(ngModule);
  phoneNumberValidator(ngModule);
}

export default formlyTypes;
