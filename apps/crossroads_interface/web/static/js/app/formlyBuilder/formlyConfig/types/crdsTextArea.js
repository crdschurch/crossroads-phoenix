export default ngModule => {
    ngModule.config(addCRDSTextarea);

    function addCRDSTextarea(formlyConfigProvider) {
        formlyConfigProvider.setType({
            name: 'crdsTextArea',
            template: '<textarea class="form-control" ng-model="model[options.key]"></textarea>',
            wrapper: ['formlyBuilderHasError', 'formlyBuilderLabel'],
            defaultOptions: {
                ngModelAttrs: {
                    rows: { attribute: 'rows' },
                    cols: { attribute: 'cols' }
                }
            },
            apiCheck: check => ({
                templateOptions: {
                    rows: check.number.optional,
                    cols: check.number.optional
                }
            })
        });
    }
}

