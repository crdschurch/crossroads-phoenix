let WOW = require('wow.js/dist/wow.min.js');
import StreamStatusService from '../services/stream-status.service';

export default class LandingController {
  constructor($rootScope, $filter, CMSService, StreamStatusService, $sce) {

    this.rootScope = $rootScope;
    this.streamStatus = StreamStatusService.getStatus();

    this.rootScope.$on('streamStatusChanged', (e, streamStatus) => {
      if (streamStatus === 'Upcoming' &&  this.streamStatus !== 'Upcoming') {
        this.moveCountdown();
      }
      this.streamStatus = streamStatus;
    });

    this.cmsService = CMSService;
    this.filter = $filter;
    this.sce = $sce;

    new WOW({
      offset: 100,
      mobile: false
    }).init();

    let maxPastWeekends = 4;

    this.cmsService
      .getRecentMessages(maxPastWeekends)
      .then((response) => {
        this.pastWeekends = this.parseWeekends(response,maxPastWeekends)
      });

    this.rootScope.$on('dynamicContentCompiled', this.moveCountdown);
  }

  moveCountdown() {
    let el = angular.element('countdown-upcoming');
    if (el.length) {
      angular.element('countdown-intro').insertAfter(el)
    }
  }

  introImage() {
    let src = '';
    switch (this.streamStatus) {
      case 'Live':
        src = 'crds-cms-uploads.imgix.net/content/images/streaming-anywhere-hero-broadcasting.jpg?w=1&crop=faces&fit=crop';
        break;
      case 'Upcoming':
        src = 'crds-cms-uploads.imgix.net/content/images/streaming-anywhere-hero-upcoming.jpg?w=1&crop=faces&fit=crop';
        break;
      case 'Off':
        src = 'crds-cms-uploads.imgix.net/content/images/streaming-anywhere-hero-off.jpg?w=1&crop=faces&fit=crop';
        break
    }

    return this.sce.trustAsResourceUrl(`//${src}`);
  }

  parseWeekends(response,maxPastWeekends) {

    let pastWeekendTotal = 0;
    let queriedPastWeekends = response.map((event, i, pastWeekends) => {

      pastWeekendTotal++;
      if ( pastWeekendTotal > maxPastWeekends ) {
        return false;
      }

      if (typeof event.series !== "undefined") {
        let title = this.filter('replaceNonAlphaNumeric')(event.title);

        event.delay = i * 100;
        event.subtitle = event.title;

        if (event.number === 0) {
          event.number++;
        }
        event.title = `${event.series.title} #${event.number}`;

        event.url = `/message/${event.id}/${title}`;
        event.image = 'https://crds-cms-uploads.imgix.net/content/images/register-bg.jpg';

        if (typeof event.messageVideo !== "undefined" && typeof event.messageVideo.still !== 'undefined') {
          event.image = event.messageVideo.still.filename
        }
      }
      return event;
    });

    return queriedPastWeekends.slice(0,maxPastWeekends);
  }
}
