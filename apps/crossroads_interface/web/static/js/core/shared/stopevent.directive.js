(function () {
    module.exports = stopevent;

    function stopevent() {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                })
            }
        }
    };
})();