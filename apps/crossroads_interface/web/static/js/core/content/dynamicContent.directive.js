module.exports = DynamicContentDirective;

DynamicContentDirective.$inject = ['$compile', '$rootScope'];

// use of html.$$unwrapTrustedValue() is explained here:
//http://stackoverflow.com/questions/22572696/bind-new-html-to-controller-after-calling-trustashtml-angularjs
// This is needed to allow scripts to be embedded in CMS pages for US857
function DynamicContentDirective($compile, $rootScope) {
 return {
      restrict: 'A',
      replace: true,
      link: function (scope, ele, attrs) {
        scope.$watch(attrs.dynamicContent, function(html) {
            if (html) {
                ele.html(html.$$unwrapTrustedValue());
            }
            
            $compile(ele.contents())(scope);

            // notify core controller to reprocess dynamically loaded content, such as images
            $rootScope.$emit('dynamicContentCompiled');
        });
      }
    };
}
