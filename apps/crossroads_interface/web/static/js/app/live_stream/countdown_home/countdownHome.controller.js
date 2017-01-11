export default class CountdownHomeController {
  constructor(ReminderService, CountdownService) {
    this.countdownService = CountdownService
    this.reminderService = ReminderService;
  }

  openReminder() {
    this.reminderService.open();
  }
}