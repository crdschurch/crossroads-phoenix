export default ngModule => {
    ngModule.run(addCRDSProfilePicture);

    function addCRDSProfilePicture(formlyConfig) {
        var ngModelAttrs = {};

        // bindings
        angular.forEach([
            'contact-id',
            'wrapper-class',
            'image-class'
        ], function (binding) {
            ngModelAttrs[camelize(binding)] = { bound: binding };
        });

        formlyConfig.setType({
            name: 'crdsProfilePicture',
            template: require('./templates/crds-profilePicture.html'),
            wrapper: ['formlyBuilderHasError'],
            defaultOptions: {
                ngModelAttrs: ngModelAttrs,
                templateOptions: {}
            }
        });

        function camelize(string) {
            string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
            // Ensure 1st char is always lowercase
            return string.replace(/^([A-Z])/, function (match, chr) {
                return chr ? chr.toLowerCase() : '';
            });
        }
    }
}