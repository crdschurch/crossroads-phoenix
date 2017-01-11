class DecisionModalController {
  /*@ngInject*/
  constructor(
    $modalInstance
  ) {
    this.modalInstance = $modalInstance;
  }

  verify() {
    this.modalInstance.close();
  }

  cancel() {
    this.modalInstance.dismiss();
  }
}

export default DecisionModalController;
