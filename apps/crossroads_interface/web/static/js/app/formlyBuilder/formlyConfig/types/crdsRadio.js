export default ngModule => {
    ngModule.config(addCRDSRadio);

    function addCRDSRadio(formlyConfigProvider) {
        formlyConfigProvider.setType({
            name: 'crdsRadio',
            template: require('./templates/crds-radio.html'),
            wrapper: ['formlyBuilderHasError', 'formlyBuilderLabel'],
            defaultOptions: {
                noFormControl: false
            },
            apiCheck: check => ({
                templateOptions: {
                    options: check.arrayOf(check.object),
                    labelProp: check.string.optional,
                    valueProp: check.string.optional,
                    inline: check.bool.optional,
                }
            })
        });
    }
}

