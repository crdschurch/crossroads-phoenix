export default ngModule => {
    ngModule.config(addCRDSSelect);

    function addCRDSSelect(formlyConfigProvider) {
        formlyConfigProvider.setType({
            name: 'crdsSelect',
            template: '<select class="form-control" ng-model="model[options.key]"><option value=""> -- Please Select One --</option> </select>',
            wrapper: ['formlyBuilderHasError', 'formlyBuilderLabel'],
            defaultOptions(options) {
                let ngOptions = options.templateOptions.ngOptions || `option[to.valueProp || 'value'] as option[to.labelProp || 'name'] group by option[to.groupProp || 'group'] for option in to.options`;
                return {
                    ngModelAttrs: {
                        [ngOptions]: {
                            value: options.templateOptions.optionsAttr || 'ng-options'
                        }
                    }
                };
            },
            apiCheck: check => ({
                templateOptions: {
                    options: check.arrayOf(check.object),
                    optionsAttr: check.string.optional,
                    labelProp: check.string.optional,
                    valueProp: check.string.optional,
                    groupProp: check.string.optional
                }
            })
        });
    }
}

