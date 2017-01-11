import CONSTANTS from 'crds-constants';

export default class RemoveRoomController {
  /* @ngInject */
  constructor($modalInstance, items) {
    this.modalInstance = $modalInstance;
    this.room = items;
  }

  ok() {
    this.modalInstance.close();
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
};