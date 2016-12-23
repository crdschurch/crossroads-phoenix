export default ngModule => {
    ngModule.config(addFormlyBuilderHasError);

    function addFormlyBuilderHasError(formlyConfigProvider) {
        formlyConfigProvider.setWrapper({
            name: 'formlyBuilderHasError', 
            template: require('./templates/formlyBuilder-has-error.html')
        });
    }
};
