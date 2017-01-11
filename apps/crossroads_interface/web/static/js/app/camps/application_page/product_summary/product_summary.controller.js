import moment from 'moment';

class ProductSummaryController {
  /* @ngInject */
  constructor(ProductSummaryForm, CampsService, $rootScope, $state) {
    this.productSummaryForm = ProductSummaryForm.createForm();
    this.campsService = CampsService;
    this.rootScope = $rootScope;
    this.state = $state;
    this.viewReady = false;
    this.submitting = false;
    this.financialAssistanceDeposit = 50;
    this.isBasePriceCurrent = false;
    this.showPopover = false;
  }

  $onInit() {
    this.model = this.productSummaryForm.getModel();
    this.productInfo = this.campsService.productInfo;

    this.determineCurrentTotal();
    this.viewReady = true;
  }

  hasProductInfo() {
    return this.productInfo && this.productInfo.basePrice && this.productInfo.basePriceEndDate;
  }

  determineCurrentTotal() {
    const now = moment();
    let option = null;

    if (this.productInfo) {
      if (this.productInfo.options) {
        option = _.find(this.productInfo.options, (each) => {
          const endDate = moment(each.endDate);
          return endDate.isSame(now, 'day') || endDate.isAfter(now, 'day');
        });
      }

      if (option) {
        option.isCurrent = true;
      } else {
        this.isBasePriceCurrent = true;
      }
    }
  }

  getMinimumDeposit() {
    if (this.model.financialAssistance) {
      return this.financialAssistanceDeposit;
    }

    return this.productInfo.depositPrice;
  }

  submit() {
    this.submitting = true;
    if (this.productSummary.$valid) {
      this.productSummaryForm.save(this.state.toParams.campId, this.state.toParams.contactId).then(() => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.successfulSubmission);
        this.state.go('campsignup.application', { page: 'camps-payment' });
      }).catch(() => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      }).finally(() => {
        this.submitting = false;
      });
    } else {
      this.submitting = false;
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
    }
  }

  togglePopover() {
    this.showPopover = !this.showPopover;
  }
}

export default ProductSummaryController;
