(function() {
    'use strict';

    angular.module('crossroads.core')
        .directive('dateRange', require('./dateRange.directive.js'));

    require('./templates/dateRange.html');

})();