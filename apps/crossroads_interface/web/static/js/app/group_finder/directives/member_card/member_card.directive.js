(function() {
  'use strict';

  module.exports = MemberCardDirective;

  require('./member_card.html');

  MemberCardDirective.$inject = [];

  function MemberCardDirective() {
    return {
      restrict: 'AE',
      scope: {
        member: '=',
      },
      controller: require('./member_card.controller'),
      templateUrl: 'member_card/member_card.html'
    };
  }
})();
