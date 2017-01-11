(function() {
  'use strict()';

  module.exports = YouTubePlayerFactory;

  YouTubePlayerFactory.$inject = ['$q', '$window'];

  function YouTubePlayerFactory($q, $window) {

    var deferred = $q.defer();
    var apiReady = deferred.promise;

    $window.onYouTubeIframeAPIReady = function() {
      deferred.resolve();
    }

    return {
      onReady: function(callback) {
        apiReady.then(callback);
      }
    }

  }

})();
