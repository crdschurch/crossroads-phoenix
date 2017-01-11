import authModalService from './authModal.service';
import authModalController from './authModal.controller';

import html from './authModal.html';

import CONSTANTS from 'crds-constants';

export default angular.
module(CONSTANTS.MODULES.GROUP_TOOL)
  .service('AuthModalService', authModalService)
  .controller('AuthModalController', authModalController)
;
