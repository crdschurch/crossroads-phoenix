class ProductSummaryFormFactory {
  /* ngInject */
  constructor($resource) {
    this.$resource = $resource;
  }

  createForm() {
    return new ProductSummaryForm(this.$resource);
  }
}

export default ProductSummaryFormFactory;

class ProductSummaryForm {
  constructor($resource) {
    this.formModel = {
      financialAssistance: false
    };

    this.productSummaryResource = $resource(`${__API_ENDPOINT__}api/camps/product`);
  }

  save(eventId, contactId) {
    const params = {
      eventId,
      contactId,
      financialAssistance: this.formModel.financialAssistance
    };

    return this.productSummaryResource.save({ }, params).$promise;
  }

  getModel() {
    return this.formModel;
  }
}
