export default ngModule => {
    ngModule.config(addCRDSRadioDesc);

    function addCRDSRadioDesc(formlyConfigProvider) {
        formlyConfigProvider.setType({
            name: 'crdsRadioDesc',
            template: require('./templates/crds-radioDescription.html'),
            wrapper: ['formlyBuilderHasError', 'formlyBuilderLabel'],
            defaultOptions: {
                noFormControl: false
            },
            apiCheck: check => ({
                templateOptions: {
                    options: check.arrayOf(check.object),
                    labelProp: check.string.optional,
                    valueProp: check.string.optional,
                    descProp: check.string.optional,
                    inline: check.bool.optional,
                    descInline: check.bool.optional,
                    bold: check.bool.optional
                }
            })
        });
    }
}

