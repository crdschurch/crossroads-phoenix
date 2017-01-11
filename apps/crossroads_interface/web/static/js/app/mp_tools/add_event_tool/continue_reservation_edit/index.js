import CONSTANTS from 'crds-constants';
import './continue_edit.html';
import continueEditController from './continueEdit.controller';

export default angular
.module(CONSTANTS.MODULES.MPTOOLS)
.controller('ContinueEditController', continueEditController);
