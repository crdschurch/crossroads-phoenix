
export default class CurrentSeriesModalController {
  constructor($modalInstance, options) {
    this.modalInstance = $modalInstance;
    this.options = options;
    this.src = options.src;
    $('#youtube-player').attr('src', this.src);
  }

  close() {
    $('#youtube-player').attr('src', '');
    this.modalInstance.close();
  }

}