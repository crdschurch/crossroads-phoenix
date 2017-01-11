export default class FBComposerController {
  /*@ngInject*/
  constructor(fbMapperConfig, fbMapperService, $log, $rootScope, $q) {
    this.fbMapperConfig = fbMapperConfig;
    this.rootScope = $rootScope;
    this.fbMapperService = fbMapperService;
    this.log = $log;
    this.qApi = $q;
    this.invokedFields = _.isFunction(this.fields) ? this.fields() : this.fields;
    this.log.debug(this);
    this.prePopulationComplete = false;
  }

  $onInit() {
    this.prepareFields(this.invokedFields).then((fields) => {
      this.preparedFields = fields;
    });
  }

  prepareFields(builderFields) {
    let compositions = [];
    let fields = [];
    _.forEach(builderFields, (builderField) => {
      let field = builderField.formlyConfig;
      let keyArray = builderField.formlyConfig.key.split('.');
      // Generate formly fields object
      this.fbMapperConfig.getElement(keyArray[keyArray.length - 1]).then((mapperConfigElement) => {
        if (_.has(mapperConfigElement, 'lookupData')){
          field.templateOptions.options = mapperConfigElement.lookupData;
          field.templateOptions.labelProp = mapperConfigElement.model.lookup.labelProp;
          field.templateOptions.valueProp = mapperConfigElement.model.lookup.valueProp;
        }
        fields.push(field);
      });
      compositions.push(keyArray[0])
    });
    compositions = _.uniq(compositions);
    // generate model
    return this.fbMapperService.prepopulateCompositions(compositions)
      .then((data) => {
        this.model = data;
        let unPopulate = _.where(builderFields, { prePopulate: false });
        _.forEach(unPopulate, (field) => {
          _.set(this.model, field.formlyConfig.key, undefined);
        });
        this.prePopulationComplete = true;
        return fields;
      });
  }

  prepareValidation(field, validations) {

  }

  submit() {
    try {
      var promise = this.fbMapperService.saveFormlyFormData(this.model)
        .then((data) => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.successfulSubmission);
          this.log.debug(this.model);
        })
    }
    catch (error) {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      throw (error);
    }
  }


}