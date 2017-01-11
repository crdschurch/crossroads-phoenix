export default ngModule => {
    ngModule.run(addTimerPicker);

    function addTimerPicker(formlyConfig) {
        var ngModelAttrs = {};

        // attributes
        angular.forEach([
            'meridians',
            'readonly-input',
            'mousewheel',
            'arrowkeys'
        ], function (attr) {
            ngModelAttrs[camelize(attr)] = { attribute: attr };
        });

        // bindings
        angular.forEach([
            'hour-step',
            'minute-step',
            'show-meridian'
        ], function (binding) {
            ngModelAttrs[camelize(binding)] = { bound: binding };
        });

        formlyConfig.setType({
            name: 'crdsTimepicker',
            template: '<timepicker ng-model="model[options.key]"></timepicker>',
            wrapper: ['formlyBuilderLabel', 'formlyBuilderHasError'],
            defaultOptions: {
                ngModelAttrs: ngModelAttrs,
                templateOptions: {
                    datepickerOptions: {}
                }
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