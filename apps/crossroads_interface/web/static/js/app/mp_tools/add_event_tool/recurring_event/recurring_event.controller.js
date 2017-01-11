import CONSTANTS from 'crds-constants';

export default class RecurringEventController {
  /* @ngInject */
  constructor($modalInstance) {
    this.modalInstance = $modalInstance;
  }

  ok() {
    this.modalInstance.close();
  }
};