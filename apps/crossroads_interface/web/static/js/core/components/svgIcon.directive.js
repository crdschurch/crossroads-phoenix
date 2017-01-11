(function(){
  
  angular.module('crossroads.core').directive('svgIcon', SvgIcon);

  SvgIcon.$inject = [];

  function SvgIcon(){
    return {
      restrict: 'E',
      scope: {
        'icon': '@?icon'
      },
      link: function link(scope, el, attr){
        el.append('<svg viewBox=\'0 0 32 32\' class=\'icon icon-' + 
            scope.icon   +  
            '\'><use xlink:href=\'#' + 
            scope.icon + '\'></use> </svg>'); 
      }
    };
  }
})();
