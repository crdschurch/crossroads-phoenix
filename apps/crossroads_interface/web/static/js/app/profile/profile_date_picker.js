'use strict()';
(function(){
    module.exports = function ($scope) {

        $scope.today = function () {
            $scope.dt = new Date();
        };

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: false
        };

        $scope.today();
    };
})();
