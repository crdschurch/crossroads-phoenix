export default ngModule => {
    ngModule.config(addCRDSCheckbox);

    function addCRDSCheckbox(formlyConfigProvider) {
        formlyConfigProvider.setType({
            name: 'crdsCheckbox',
            template: require('./templates/crds-checkbox.html'),
            wrapper: ['formlyBuilderHasError'],
            apiCheck: check => ({
                templateOptions: {
                    label: check.string
                }
            })
        });
    }
}

