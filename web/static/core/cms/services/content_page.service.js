(function () {
    'use strict';

    module.exports = ContentPageService;

    ContentPageService.$inject = [];

    function ContentPageService() {
        var service = {};
        service.page = {};
        service.reset = reset;
        return service;

        function reset() {
            service.page = {};
        }
    }
})();
