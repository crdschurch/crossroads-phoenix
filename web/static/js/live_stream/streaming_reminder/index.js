import CONSTANTS from 'crds-constants';
import streamingReminderController from './streamingReminder.controller';
import html from './streamingReminder.html';

export default angular.module(CONSTANTS.MODULES.LIVE_STREAM)
  .controller('StreamingReminderController', streamingReminderController)
;