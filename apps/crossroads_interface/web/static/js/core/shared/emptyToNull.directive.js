"use strict()";

(function(){
  module.exports =EmptyToNull;
  function EmptyToNull() {
    return {
      restrict: "A",
      require: "ngModel",
      link : link
    };

    function link(scope, el, attr, ctrl) {
      ctrl.$parsers.push(function(viewValue) {
                if(viewValue === "") {
                    return null;
                }
                return viewValue;
            });
    };
  }

}
)();
