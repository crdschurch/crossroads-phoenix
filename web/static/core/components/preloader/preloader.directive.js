'use strict()';
(function(){
  angular.module('crossroads.core').directive("preloader", preloader);

  preloader.$inject = [];

  function preloader(){
    return {
      restrict: 'EA',
      scope: {
        fullScreen: '='
      },
      templateUrl: 'preloader/preloader.html',
      link: link
    }

    function link(scope, el, attr){
      
      scope.isFullScreen = isFullScreen;

      /////////////////////////////////

      function isFullScreen(){
        return (scope.fullScreen !== undefined || scope.fullScreen !== null) && scope.fullScreen;
      };

    };
  }
})();
