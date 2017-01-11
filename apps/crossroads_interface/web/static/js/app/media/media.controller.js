(function () {
  'use strict';
  module.exports = MediaController;

  MediaController.$inject = ['Series', 'SingleMedia'];

  function MediaController(Series, SingleMedia) {
    var vm = this;
    vm.series = Series.series;

    var singleMedia = SingleMedia.singleMedia;
    vm.musics = filterByClass(singleMedia, 'Music');
    vm.videos = filterByClass(singleMedia, 'Video');

    function filterByClass(singleMedia, className) {
      return _.filter(singleMedia, function(item) {
        if (item.className === className) {
          return item;
        }
      });
    }
  }
})();
