(function() {
  'use strict';
  module.exports = ErrorHandler;

  function ErrorHandler($log) {

    return function(exception, cause) {
      //TODO: We need to queue these up and send them to the server
      //exception.message += ' (caused by "' + cause + '")';
      $log.error(exception.message);

      //throw exception;
    };

  }
})();
