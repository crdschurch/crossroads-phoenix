/*@ngInject*/
class NoTakeBacksController {
  constructor($modalInstance) {
    this.modalInstance = $modalInstance;
  }

  ok() {
    this.modalInstance.close();
  }

  cancel() {
    this.modalInstance.dismiss();
  }
}

export default NoTakeBacksController;
