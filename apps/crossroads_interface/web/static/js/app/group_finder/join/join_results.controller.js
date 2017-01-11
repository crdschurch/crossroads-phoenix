(function() {
  'use strict';

  module.exports = JoinResultsCtrl;

  JoinResultsCtrl.$inject = [
    'Results',
    'GROUP_ID',
    '$state',
    'Responses',
    'LookupDefinitions'
  ];

  function JoinResultsCtrl(Results,
                           GROUP_ID,
                           $state,
                           Responses,
                           LookupDefinitions
  ) {
    var vm = this;

    vm.loading = true;
    vm.currentPage = 1;
    vm.numPerPage = 6;
    vm.noResultsHelp = noResultsHelp;
    vm.pending = true;
    vm.startOver = startOver;
    vm.initialize = initialize;
    vm.showMore = showMore;
    vm.error = false;
    vm.hasResults = true;

    function initialize() {

      if (!Responses.data.completed_flow) {
        $state.go('group_finder.join.questions');
      }

      Results.clearData();

      var lookup = LookupDefinitions.lookup;

      var participant = {
        address: {
          addressLine1: Responses.data.location.street,
          city: Responses.data.location.city,
          state: Responses.data.location.state,
          zip: Responses.data.location.zip
        },
        singleAttributes: Responses.getSingleAttributes(lookup),
        attributeTypes: Responses.getMultiAttributes(lookup, ['date_time_week', 'date_time_weekend'])
      };

      vm.resultsPromise = Results.loadResults(participant)
        .then(displayResults)
        .catch(function(error) {
          console.log('Search Result Error:', error);
          vm.error = true;
          vm.loading = false;
        });
    }

    function showMore() {
      var start = 0,
          end = vm.filteredResults.length + 6; // grab the next 6 results
      vm.filteredResults = vm.results.slice(start, end);

      // hide the "Show More" button if there are no more results
      if (vm.filteredResults.length === vm.results.length) {
        vm.hasResults = false;
      }
    }

    function noResultsHelp() {
      $state.go('group_finder.invitation', {groupId: GROUP_ID.NO_GROUP});
    }

    function startOver() {
      Results.clearData();
      $state.go('group_finder.join.questions');
    }

    function displayResults(results) {
      // this should get passed if once the $promise completes but just in case...
      vm.results = results;
      if (!vm.results) {
        vm.results = Results.getResults();
      }

      vm.loading = false;

      // just show the first 6 items
      vm.filteredResults = vm.results.slice(0, 6);

      // don't display the "Show More" button if there are no more results
      vm.hasResults =  vm.results.length - vm.filteredResults.length >= 1;
    }

    vm.initialize();
  }
})();
