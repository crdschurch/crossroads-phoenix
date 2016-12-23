(function() {
  'use strict';

  module.exports = AttributeType;

  AttributeType.$inject = ['$resource', '$cookies'];

  function AttributeType($resource, $cookies) {
    return {
      AttributeTypes: AttributeTypes
    };

    function AttributeTypes(params) {
      return $resource(__API_ENDPOINT__ + 'api/AttributeType/:id',
          params,
          {
            get: { method:'GET', cache: true },
            query: { method:'GET', cache: true, isArray:true }
          }
        );
    }
  }
})();
