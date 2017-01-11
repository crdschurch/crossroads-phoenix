export default ngModule => {
    ngModule.run(addCRDSCheckboxCombo);

    function addCRDSCheckboxCombo(formlyConfig) {
        formlyConfig.setType({
            name: 'crdsMultiCheckBoxCombo',
            template: require('./templates/crds-multiCheckBoxCombo.html'),
            wrapper: ['formlyBuilderLabel', 'formlyBuilderHasError'],
            apiCheck: check => ({
                templateOptions: {
                    options: check.arrayOf(check.object),
                    labelProp: check.string.optional,
                    valueProp: check.string.optional,
                    maxFieldLength: check.string.optional,
                    descProp: check.string.optional,
                    placeholder: check.string.optional
                }
            }),
            defaultOptions: {
                noFormControl: false,
                ngModelAttrs: {
                    required: {
                        attribute: '',
                        bound: ''
                    }
                }
            },
            controller: /* @ngInject */ function ($scope) {
                const to = $scope.to;
                const opts = $scope.options;
                const ep = $scope.expressionProperties;
                $scope.multiCheckboxCombo = {
                    checked: [],
                    detail: [],
                    change: setModel
                };

                // initialize the checkboxes check property
                $scope.$watch('model', function modelWatcher(newModelValue) {
                    var modelValue, valueProp;
                    if (Object.keys(newModelValue).length) {
                        modelValue = newModelValue[opts.key];

                        $scope.$watch('to.options', function optionsWatcher(newOptionsValues) {
                            if (newOptionsValues && Array.isArray(newOptionsValues) && Array.isArray(modelValue)) {
                                valueProp = to.valueProp || 'value';
                                for (var index = 0; index < newOptionsValues.length; index++) {
                                    //$scope.multiCheckboxCombo.checked[index] = modelValue.indexOf(newOptionsValues[index][valueProp]) !== -1;
                                    // $scope.multiCheckboxCombo.checked[index] = _.findIndex(modelValue, (item) => { 
                                    //     return item.value == newOptionsValues[index][valueProp] 
                                    // }) !== -1;// modelValue.indexOf(newOptionsValues[index][valueProp]) !== -1;
                                    var item = _.find(modelValue, (item) => {
                                        return item.value == newOptionsValues[index][valueProp]
                                    })

                                    if (item != null || item != undefined) {
                                        $scope.multiCheckboxCombo.detail[index] = item.detail;
                                        $scope.multiCheckboxCombo.checked[index] = true;
                                    } else {
                                        $scope.multiCheckboxCombo.detail[index] = '';
                                        $scope.multiCheckboxCombo.checked[index] = false;
                                    }
                                }


                            }
                        });
                    }
                }, true);

                function areRequiredDetailsFilledOut() {
                    var valid = true;
                    angular.forEach($scope.model[opts.key], (item, index) => {
                        if (item.detail == 'undefined' || item.detail == null || item.detail == '') {
                            valid = false;
                        }
                    });
                    return valid;
                }

                function checkValidity(expressionValue) {
                    var valid, checkValid, detailValid;
                    if ($scope.to.required) {
                        checkValid = angular.isArray($scope.model[opts.key]) &&
                            $scope.model[opts.key].length > 0 &&
                            expressionValue;

                        //if checkbox is checked, detail is required
                        detailValid = areRequiredDetailsFilledOut();
                        valid = detailValid && checkValid;
                        if (angular.isArray($scope.fc)) {
                            angular.forEach($scope.fc, function (item, key) {
                                item.$setValidity('requiredCategories', valid)
                            }, this);
                        } else {
                            $scope.fc.$setValidity('requiredCategories', valid);
                        }
                    }
                }

                function setModel() {
                    $scope.model[opts.key] = [];
                    angular.forEach($scope.multiCheckboxCombo.checked, (checkbox, index) => {
                        if (checkbox) {
                            $scope.model[opts.key].push({ 
                                detail: to.options[index]['disabled'] ? to.options[index]['static'] : $scope.multiCheckboxCombo.detail[index], 
                                value: to.options[index][to.valueProp || 'value'] 
                            });
                            
                        } else {
                            $scope.multiCheckboxCombo.detail[index] = '';
                        }
                    });
                    // Must make sure we mark as touched because only the last checkbox due to a bug in angular.

                    //for each
                    if (angular.isArray($scope.fc)) {
                        angular.forEach($scope.fc, function (item, key) {
                            item.$setTouched()
                        }, this);
                    } else {
                        $scope.fc.$setTouched('required', valid);
                    }
                    checkValidity(true);

                    if ($scope.to.onChange) {
                        $scope.to.onChange();
                    }
                }

                if (opts.expressionProperties && opts.expressionProperties['templateOptions.required']) {
                    $scope.$watch(function () {
                        return $scope.to.required;
                    }, function (newValue) {
                        checkValidity(newValue);
                    });
                }

                if ($scope.to.required) {
                    var unwatchFormControl = $scope.$watch('fc', function (newValue) {
                        if (!newValue) {
                            return;
                        }
                        checkValidity(true);
                        unwatchFormControl();
                    });
                }
            }
        });
    }
};

