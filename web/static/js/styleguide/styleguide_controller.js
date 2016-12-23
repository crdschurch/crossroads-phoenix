'use strict()';
(function () {
  module.exports = function ($scope, $location, $anchorScroll, growl, $modal) {
    var _this = this;

    _this.time = Date.now();
    _this.hstep = 1;
    _this.mstep = 15;
    _this.isMeridian = true;
    _this.openDatePicker = openDatePicker;

    _this.scrollTo = function (id) {
      $location.hash(id);
      console.log($location.hash());
      $anchorScroll();
    }

    _this.Growl = function (type, message) {
      growl[type](message);
    }


    _this.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'styleModalContent.html',
        backdrop: true,
        size: size,
      })
    }

    _this.dynamicTooltip = 'Hello, World!';
    _this.dynamicTooltipText = 'dynamic';
    _this.htmlTooltip = 'I\'ve been made <b>bold</b>!';

    function openDatePicker($event) {
      $event.preventDefault();
      $event.stopPropagation();

      _this.opened = true;
    }
  }
})();
