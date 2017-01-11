export default ngModule => {
    ngModule.run(addZipCodeValidator);

    function addZipCodeValidator(formlyConfig) {
        formlyConfig.setType({
            name: 'zipcode',
            defaultOptions: {
                validators: {
                    zipcode: {
                        expression: function (value) {
                            let regex = /^\d{5}$/;
                            return regex.test(value);
                        },
                        message: "'Zip code does not appear to be valid.'"
                    }
                }
            }
        });
    }
}