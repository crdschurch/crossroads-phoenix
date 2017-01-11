import CONSTANTS from 'crds-constants';

export default class ContinueEditController {
  /* @ngInject */
  constructor($modalInstance) {
    this.modalInstance = $modalInstance;
  }

  ok() {
    this.modalInstance.close();
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}