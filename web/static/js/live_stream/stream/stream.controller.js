export default class StreamingController {
  constructor(CMSService, StreamspotService, GeolocationService, $rootScope, $modal, $location, $timeout, $sce, $document) {
    this.cmsService = CMSService;
    this.streamspotService = StreamspotService;
    this.geolocationService = GeolocationService;
    this.rootScope = $rootScope;
    this.timeout = $timeout;
    this.document = $document;
    this.modal = $modal;
    this.inProgress = false;
    this.numberOfPeople = 2;
    this.displayCounter = true;
    this.countSubmit = false;
    this.dontMiss = [];
    this.beTheChurch = [];
    this.inlineGiving = [];

    this.sce = $sce;
    let debug = false;

    if ($location !== undefined) {
      const params = $location.search();
      debug = params.debug;
    }

    if (debug === 'true') {
      this.inProgress = true;
    } else {
      this.rootScope.$on('isBroadcasting', (e, inProgress) => {
        this.inProgress = inProgress;
        if (this.inProgress === false) {
          window.location.href = '/live';
        }
      });
    }

    this.cmsService
        .getDigitalProgram()
        .then((data) => {
          this.sortDigitalProgram(data);
        });

    this.openGeolocationModal();
  }

  sortDigitalProgram(data) {
    data.forEach((feature, i) => {
      // null status indicates a published feature
      if (feature.status === null || feature.status.toLowerCase() !== 'draft') {
        feature.delay = i * 100;
        feature.url = 'javascript:;';

        if (feature.link !== null) {
          feature.url = feature.link;
        }

        feature.target = '_blank';

        if (typeof feature.image !== 'undefined' && typeof feature.image.filename !== 'undefined') {
          let filename = feature.image.filename.replace('https://s3.amazonaws.com/crds-cms-uploads/', '');
          feature.image = `https://crds-cms-uploads.imgix.net/${filename}?ixjsv=2.2.3&w=225`;
        } else {
          feature.image = 'https://crds-cms-uploads.imgix.net/content/images/register-bg.jpg';
        }
        if (feature.section === 1) {
          this.dontMiss.push(feature);
        } else if (feature.section === 2) {
          this.beTheChurch.push(feature);
        }
      }
    });
  }

  showGeolocationBanner() {
    return this.geolocationService.showBanner();
  }

  openGeolocationModal() {
    if (this.geolocationService.showModal()) {
      this.modalInstance = this.modal.open({
        templateUrl: 'geolocation_modal/geolocationModal.html',
        controller: 'GeolocationModalController',
        controllerAs: 'geolocationModal',
        openedClass: 'geolocation-modal',
        backdrop: 'static',
        size: 'lg'
      });
    }
  }

}
