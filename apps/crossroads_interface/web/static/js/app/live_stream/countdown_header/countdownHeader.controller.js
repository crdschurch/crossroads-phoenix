export default class CountdownHeaderController {
  constructor($document, $window, CountdownService, ReminderService) {
    this.document = $document;
    this.window   = $window;
    this.countdownService = CountdownService;
    this.reminderService = ReminderService;
    
    this.setElements();

    angular.element(this.window).bind("scroll", this.onScroll.bind(this));
  }

  openReminder() {
    this.reminderService.open();
  }

  onScroll() {
    let offset = this.wrapper.getBoundingClientRect().top,
        intro  = document.getElementById('intro');

    if (offset < 0) {
      this.wrapper.classList.add('fixed-header');
      if ( intro !== null ) {
        intro.style.marginTop = `${this.header.offsetHeight.toString()}px`;
      }
    } else {
      this.wrapper.classList.remove('fixed-header');
      if ( intro !== null ) {
        intro.style.marginTop = '';
      }
    }
  }

  setElements() {
    this.header  = document.getElementById('countdown');
    this.intro   = document.getElementById('intro');
    this.wrapper = document.getElementById('wrapper');
  }

  scrollToSchedule() {
    let duration = 1000, //milliseconds
        offset = this.header.offsetHeight,
        el = angular.element(document.getElementById('series'));

    // Account for setting header as fixed on scroll
    if (!this.wrapper.classList.contains('fixed-header')) {
      offset *= 2;
    }

    this.document.scrollToElement(el, offset, duration);
  }
}