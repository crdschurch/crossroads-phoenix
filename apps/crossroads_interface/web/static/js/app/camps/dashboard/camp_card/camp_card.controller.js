/**
 * CampCardController:
 * Passed in via the component directive:
 *    attendee
 *    startDate
 *    endDate
 *    paymentRemaining
 *    primary contact
 *    camperId
 *    campId
 *    campPrimaryContact
 */
class CampCardController {
  constructor($state, $filter, CampsService) {
    this.state = $state;
    this.filter = $filter;
    this.campsService = CampsService;
    this.isLoading = true;
  }

  $onInit() {
    // Used to disable the `Make Payment` button
    this.isPaidInFull = (this.paymentRemaining <= 0);
  }

  updateMedical() {
    this.campsService.initializeCamperData();
    this.state.go('campsignup.application', { page: 'medical-info', contactId: this.camperId, campId: this.campId, update: true });
  }

  makePayment() {
    this.campsService.initializeCamperData();
    this.state.go('campsignup.application', { page: 'camps-payment', contactId: this.camperId, campId: this.campId, update: true, redirectTo: 'payment-confirmation' });
  }

  formatDate() {
    const startDateMoment = moment(this.startDate);
    const endDateMoment = moment(this.endDate);
    const monthDayStart = startDateMoment.format('MMMM Do');
    const monthDayEnd = endDateMoment.format('MMMM Do');
    const year = startDateMoment.format('YYYY');
    return `${monthDayStart} - ${monthDayEnd}, ${year}`;
  }

  formatAmountDue() {
    // 0 is falsy so `!this.paymentRemaining` evaluates to true when 0
    if (this.paymentRemaining === null || this.paymentRemaining === undefined) {
      return `Error getting payments. Please contact ${this.campPrimaryContact}`;
    } else if (this.paymentRemaining < 0) {
      const balance = this.filter('currency')(this.paymentRemaining);
      return `Error: Overpaid by ${balance}. Please contact ${this.campPrimaryContact}`;
    }

    return this.filter('currency')(this.paymentRemaining);
  }
}

export default CampCardController;
