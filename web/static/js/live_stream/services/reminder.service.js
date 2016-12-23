import moment from 'moment';
import 'moment-timezone';

export default class ReminderService {
  constructor($http, $modal) {
    this.http = $http;
    this.modal = $modal;
    this.url = __API_ENDPOINT__;
    this.headers = { 'Content-Type': 'application/json' };
  }

  send(reminder) {
    let result = null;
    let time = reminder.time.slice(0, reminder.time.length - 4);

    reminder.startDate = moment.tz(`${reminder.day} ${time}`, 'MM/DD/YYYY h:mma', "America/New_York").toISOString();
    if (reminder.isValid()) {
      switch(reminder.type) {
        case 'phone':
          result = this.sendTextReminder(reminder);
          break;
        case 'email':
          result = this.sendEmailReminder(reminder);
          break;
      }
    }
    return result;
  }

  sendTextReminder(reminder) {
    let body = JSON.stringify({ 
      "templateId": 0,
      "mergeData": {
        "Event_Date":       reminder.userTZDateShortFormat(reminder.startDate),
        "Event_Start_Time": reminder.userTZTimeWithTZSuffix(reminder.startDate)
      },
      "startDate":     reminder.startDate,
      "toPhoneNumber": reminder.phone
    });

    return this.http
      .post(`${this.url}api/sendTextMessageReminder`, body, this.headers);
  }

  sendEmailReminder(reminder) {
  
    let body = JSON.stringify({
      "emailAddress":   reminder.email,
      "startDate":      reminder.startDate,
      "mergeData": {
        "Event_Date":       reminder.userTZDateShortFormat(reminder.startDate),
        "Event_Start_Time": reminder.userTZTimeWithTZSuffix(reminder.startDate)
      },
    })

    return this.http
      .post(`${this.url}api/sendEmailReminder`, body, this.headers);
  }

  open(options) {
    this.modal.open({
      templateUrl: 'streaming_reminder/streamingReminder.html',
      controller: 'StreamingReminderController',
      controllerAs: 'reminder',
      openedClass: 'crds-modal reminder-modal',
      size: 'lg'
    });
  }
}
