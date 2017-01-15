
import CONSTANTS from 'crds-constants';
import liveStreamRouter from './live_stream.routes';
import StreamspotService from './services/streamspot.service';
import ReminderService from './services/reminder.service';
import StreamStatusService from './services/stream-status.service';
import GeolocationService from './services/geolocation.service';
import CountdownService from './services/countdown.service';
import GoogleMapsService from '../services/google_maps.service';

export default angular
  .module(CONSTANTS.MODULES.LIVE_STREAM, [CONSTANTS.MODULES.CORE, CONSTANTS.MODULES.COMMON, CONSTANTS.MODULES.MEDIA, CONSTANTS.MODULES.PROFILE])
  .config(liveStreamRouter)
  .service('StreamspotService', StreamspotService)
  .service('ReminderService', ReminderService)
  .service('GeolocationService', GeolocationService)
  .service('GoogleMapsService', GoogleMapsService)
  .service('StreamStatusService', StreamStatusService)
  .service('CountdownService', CountdownService)
;

require('./content_card');
require('./countdown_header');
require('./countdown_home');
require('./countdown_intro');
require('./current_series');
require('./current_series_modal');
require('./geolocation');
require('./geolocation_modal');
require('./landing');
require('./stream');
require('./stream_videojs');
require('./streaming_reminder');
require('./streamspot_player');
require('./videojs_player');
require('../../core/components/social_sharing');
