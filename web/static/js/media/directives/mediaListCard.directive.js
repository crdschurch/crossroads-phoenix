(function () {
  'use strict';

  module.exports = MediaListCard;

  MediaListCard.$inject = [];

  function MediaListCard() {
    return {
      restrict: "EA",
      templateUrl: function (elem, attr) {
        return 'templates/' + attr.type + 'ListCard.html';
      },
      scope: {
        items: '=',
        limit: "="
      }
    };
  }
})();
