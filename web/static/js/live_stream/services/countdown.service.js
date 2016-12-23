import Countdown from '../models/countdown';

export default class CountdownService {
  constructor($rootScope, StreamspotService) {
    this.rootScope = $rootScope;
    this.streamspotService = StreamspotService;
    this.countdown = new Countdown();

    this.rootScope.$on('nextEvent', (e, event) => {
      this.event = event;
      this.parseEvent();
    })
  }

  parseEvent() {
    this.isCountdown    = this.event.isUpcoming();
    this.isBroadcasting = this.event.isBroadcasting();

    let now = moment();
    let difference = this.event.start.diff(now);
    
    let tz = 'America/New_York';
    let format = 'YYYY-MM-DD H:mm:ss';

    let isNowDst = moment.tz(now, format, tz).isDST();
    let isStartDst = moment.tz(this.event.start, format, tz).isDST();

    if ( isNowDst && !isStartDst ) {
      this.countdown.overlapDst = -1;
    }
    else if ( !isNowDst && isStartDst ) {
      this.countdown.overlapDst = 1;
    }

    let duration = moment.duration(difference);
    
    this.countdown.days    = this.pad(duration.days());
    this.countdown.hours   = this.pad(duration.hours());
    this.countdown.minutes = this.pad(duration.minutes());
    this.countdown.seconds = this.pad(duration.seconds());
    this.displayCountdown  = true;
  }

  pad(value) {
    return value < 10 ? `0${value}`: `${value}`;
  }
}