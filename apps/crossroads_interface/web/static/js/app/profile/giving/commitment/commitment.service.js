(function() {
  'use strict';
  module.exports = CommitmentService;

  CommitmentService.$inject = ['$resource'];

  function CommitmentService($resource) {

    return {
      getPledgeCommitments: $resource(__API_ENDPOINT__ + 'api/donor/pledge'),
    };

  }

})();
