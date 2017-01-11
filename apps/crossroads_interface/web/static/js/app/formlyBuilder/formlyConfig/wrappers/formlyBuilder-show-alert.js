export default ngModule => {
    ngModule.config(addFormlyBuilderShowAlert);

    function addFormlyBuilderShowAlert(formlyConfigProvider) {
        formlyConfigProvider.setWrapper({
            name: 'formlyBuilderShowAlert',
            template: require('./templates/formlyBuilder-show-alert.html')
        });
    }
}