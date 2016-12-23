(function() {
  'use strict';

  module.exports = FormBuilderService;
  FormBuilderService.$inject = ['$resource'];

  function FormBuilderService($resource) {
    return {
      Groups: $resource(__API_ENDPOINT__ +  'api/formbuilder/groups/:templateType'),
      Attribute: $resource(__API_ENDPOINT__ +  'api/attributetype/:attributeTypeId'),
    };
  }
})();
