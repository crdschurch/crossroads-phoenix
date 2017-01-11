export default ngModule => {
    ngModule.config(addFormlyBuilderLabel);

    function addFormlyBuilderLabel(formlyConfigProvider) {
        formlyConfigProvider.setWrapper({
            name: 'formlyBuilderLabel',
            template: require('./templates/formlyBuilder-label.html'),
            apiCheck: check => ({
                templateOptions: {
                    label: check.string.optional,
                    required: check.bool.optional,
                    labelSrOnly: check.bool.optional,
                    helpBlock: check.string.optional,
                }
            })
        });
    }
};
