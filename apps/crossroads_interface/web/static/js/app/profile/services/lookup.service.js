(function() {
  module.exports = function LookupService($resource, Session) {
    return $resource(__API_ENDPOINT__ + 'api/lookup/');
  };
})();
