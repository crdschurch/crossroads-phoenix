(function() {
  'use strict';

  module.exports = EmailBoxDirective;

  EmailBoxDirective.$inject = [];

  function EmailBoxDirective() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        isMessageToggled: '=?',
        sendMessageCallback: '&sendMessageCallback',
        loading: '='
      },
      templateUrl: 'emailBox/emailBox.html',
      controller: 'EmailBoxController as emailBox',
      bindToController: true
    };

  }

})();
