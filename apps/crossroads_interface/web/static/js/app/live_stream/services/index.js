import streamspotService from './streamspot.service';
import reminderService from './reminder.service';
import CONSTANTS from 'crds-constants';

export default angular
  .module(CONSTANTS.MODULES.LIVE_STREAM)
  .service('StreamspotService', streamspotService)
  .service('ReminderService', reminderService)
