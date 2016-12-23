'use strict()';
(function() {
  angular.module('crossroads.mptools').factory('GPExport', GPExport);

  GPExport.$inject = ['$resource'];

  function GPExport($resource) {
    return {
      FileNames: $resource(__API_ENDPOINT__ + 'api/gpexport/filenames/:selectionId'),

      // Found this here http://davidjs.com/2015/07/download-files-via-post-request-in-angularjs/
      File: $resource(__API_ENDPOINT__ + 'api/gpexport/file/:selectionId/:depositId', 
              { selectionId: '@selectionId', depositId: '@depositId' },
              {
                download: {
                    method: 'GET',
                    responseType: 'arraybuffer',
                    cache: false,
                    transformResponse: function (data, headers){
                      var file = null;
                      if (data) {
                        file = new Blob([data], {type: 'application/octet-stream'});
                      }

                      return { response: { blob: file } };
                    },
                },
              })
    }
  }
})();
