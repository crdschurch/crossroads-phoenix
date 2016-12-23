(function() {
    'use strict';
    module.exports = AddEventsData;

    AddEventsData.$inject = ['$log', '$location', '$resource', '$stateParams', '$timeout'];

    function AddEventsData($log, $location, $resource, $stateParams, $timeout) {
        return{
            restrict: 'A',
            priority: 1001,
            link: function(scope, element, attrs) {

                // consider moving the resource code to a service and calling it from in a controller
                var loadEvents = function(){

                    $log.debug("In addEventsData directive");
                    var evts = $resource(__API_ENDPOINT__ + 'api/events/:site').query({site:$stateParams.site}, function(response) {
                        $log.debug("Response: " + response);
                        evts = response;
                        debugger;
                        var tbody = $('<tbody>');
                        for(var i = 0; i < evts.length; i++) {
                            $log.debug("Event: " + evts[i]);
                            var row = $('<tr>');
                            var evtTime = $('<td class="first-cell">');
                            var evtMeridian = $('<span>');
                            var evtName = $('<td class="second-cell">');
                            var evtLocation = $('<td class="third-cell">');

                            evtTime.append(evts[i].time);
                            evtMeridian.append(evts[i].meridian)
                            evtTime.append(evtMeridian);
                            evtName.append(evts[i].name);
                            evtLocation.append(evts[i].location);

                            row.append(evtTime);
                            row.append(evtName);
                            row.append(evtLocation);

                            tbody.append(row);
                        }
                        var atriumCycleCell = $('<div class="atrium-cycle-cell">');
                        var atriumTable = $('<table class="table atrium-table">');
                        atriumTable.append(tbody);
                        atriumCycleCell.append(atriumTable);
                        atriumCycleCell.append($('<hr class="atrium-border" />'));
                        element.append(atriumCycleCell);

                        var marqueeElement = $(".atrium-body");
                        var marqueeHeight = $(marqueeElement).height();
                        var windowHeight = $(window).height();
                        $log.debug("Marquee Height: " + marqueeHeight);
                        $log.debug("Window Height: " + windowHeight);
                        if (marqueeHeight >= windowHeight) {
                            $log.debug("Appending clone of div to force scroll");
                            element.append(atriumCycleCell.clone());
                            $('hr.atrium-border').show();
                        };
                        element.cycle();
                    });
                }

                loadEvents();

                // force a refresh once an hour
                $timeout(function() {
                    window.location.reload();
                }, 3600000);
            }
        }
    }
})();