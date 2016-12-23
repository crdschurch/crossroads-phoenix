export default class LinkedContentController {
  constructor($element, $sce, ResponsiveImageService) {
    this.element = $element;
    this.sce = $sce;
    this.ResponsiveImageService = ResponsiveImageService;

    this.element.bind('click', (e) => {
      if (!this.isLinked()) {
        e.preventDefault();
      }
    })
  }

  $onInit() {
    this.href = this.isLinked() ? this.href : '#';
    this.parseBackground();
    this.ResponsiveImageService.updateResponsiveImages();
  }

  isLinked() {
    return (this.href !== undefined && this.href !== '' && this.href !== '#' && this.href !== 'javascript:;');
  }

  parseBackground() {
    if(this.background !== undefined) {
      this.background = this.background.replace(/https?:\/\/[^/]*\/(crds-cms-uploads\/)?/, "//crds-cms-uploads.imgix.net/");
    }
  }
}