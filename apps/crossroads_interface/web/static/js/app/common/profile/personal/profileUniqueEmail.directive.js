'use strict()';
(function(){

    module.exports = function ($http, Session, User) {

      return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            validateUnique: "=",
            onEmailFound: "&",
            onEmailNotFound: "&",
        },
        link: function(scope, element, attrs, ngModel) {
            var userid = Session.exists('userId') !== undefined ? Session.exists('userId') : 0;
            var shouldValidateUnique = true;
            element.bind('blur', function (e) {
                if(scope.validateUnique === undefined || scope.validateUnique === null) {
                    shouldValidateUnique = true;
                } else {
                    shouldValidateUnique = scope.validateUnique;
                }

                if(shouldValidateUnique) {
                    ngModel.$setValidity('unique', undefined);
                }

                $http.get(__API_ENDPOINT__ + 'api/lookup/' + userid  + '/find/?email=' +  encodeURI(element.val()), {
                    headers: {
                        "X-Use-The-Force": "true"
                    }
                })
                .success(function(data) {
                    // Successful response from this call means we did NOT find a matching email
                    // which means that the unique email field is valid
                    if(shouldValidateUnique) {
                        ngModel.$setValidity('unique', true);
                        User.email = element.val();
                    }

                    var onEmailNotFound = scope.onEmailNotFound();
                    if(angular.isDefined(onEmailNotFound) && angular.isFunction(onEmailNotFound)) {
                        onEmailNotFound();
                    }
                })
                .error(function(err) {
                    // Error response from this call means we DID find a matching email,
                    // which means that the unique email field is not valid
                    if(shouldValidateUnique) {
                        ngModel.$setValidity('unique', false);
                        User.email = element.val();
                    }

                    var onEmailFound = scope.onEmailFound();
                    if(angular.isDefined(onEmailFound) && angular.isFunction(onEmailFound)) {
                        onEmailFound();
                    }
                });
            });
        }
      };
  }

})()
