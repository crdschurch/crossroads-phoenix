export default ngModule => {
    ngModule.config(addFormlyBuilderShowError);

    function addFormlyBuilderShowError(formlyConfigProvider) {
        formlyConfigProvider.setWrapper({
            template: require('./templates/formlyBuilder-show-error.html')
        });
    }
}

