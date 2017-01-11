'use strict()';
(function(){

  angular.module('crossroads.core').filter('html', HtmlFilter);

  HtmlFilter.$inject = ['$sce'];

  function HtmlFilter($sce){
    return function (val) {
      return $sce.trustAsHtml(val);
    };
  }

})();

