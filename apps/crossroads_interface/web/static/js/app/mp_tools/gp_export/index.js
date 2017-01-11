(function() {
  'use strict()';

  var module = 'crossroads.mptools';

  require('./gpExport.service');
  require('./gpExport.html');

  angular.module(module).controller('GPExportController', require('./gpExport.controller'));

})();
