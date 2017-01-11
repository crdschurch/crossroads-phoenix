export default class Reminder {
  constructor() {
    this.formattedDay = '';
    this.day          = '';
    this.time         = '';
    this.phone        = '';
    this.email        = '';
    this.type         = 'phone';
    this.startDate    = '';
    this.isDayValid;
    this.isTimeValid;
    this.isPhoneValid;
    this.isEmailValid;
  }

  isValid() {
    return this.day.length > 0 && this.time.length > 0 && this.type.length > 0 && (this.phone.length > 0 || this.email.length > 0);
  }

  userTZTimeWithTZSuffix(dateTime) {
    let userTimeZone = moment.tz.guess(),
        timeFormat = 'h:mma z';

    return moment(dateTime).tz(userTimeZone).format(timeFormat);
  }

  userTZDateShortFormat(dateTime) {
    let userTimeZone = moment.tz.guess(),
        dateFormat = 'MM/DD/YYYY';

    return moment(dateTime).tz(userTimeZone).format(dateFormat);
  }
}
