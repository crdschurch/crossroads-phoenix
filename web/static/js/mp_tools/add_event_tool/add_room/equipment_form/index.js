import CONSTANTS from 'crds-constants';
import './equipment_form.html';
import equipmentFormComponent from './equipmentForm.component';

export default angular
.module(CONSTANTS.MODULES.MPTOOLS)
.component('equipmentForm', equipmentFormComponent())
.directive('uniqueEquipment', require('./uniqueEquipment.directive'));
