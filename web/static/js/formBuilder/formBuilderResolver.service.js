(function() {
  'use strict';
  module.exports = FormBuilderResolverService;
  FormBuilderResolverService.$inject = ['Lookup', 'Profile', '$resolve', 'FormBuilderService', '$q', 'FormBuilderFieldsService'];

  // Return a non-singleton object factory for getting the map of data needed
  // by the profile pages.  Controllers should use getInstance() to get a
  // a promise, which will be resolved by the Angular UI Router resolver ($resolve).
  // This is similar to the behavior implemented by the resolve property on a
  // UI Router state.
  function FormBuilderResolverService(Lookup, Profile, $resolve, FormBuilderService, $q, FormBuilderFieldsService) {
    var fieldsService = FormBuilderFieldsService;

    var data = {
      availableGroups: function(fields) {
        if (!fieldsService.hasGroupParticipant()) {
          return resolvedPromise();
        }

        var cmsTemplateType = _.find(fields, function(data) {
          if (!data.templateType) {
            return false;
          }

          return _.startsWith(data.templateType, 'Groups');
        });

        return FormBuilderService.Groups.query({
          templateType: cmsTemplateType.templateType
        }).$promise;
      },

      attributeTypes: function(fields) {
        if (!fieldsService.hasGroupParticipant()) {
          return resolvedPromise();
        }

        return FormBuilderService.Attribute.query().$promise;
      },

      genders: function(fields) {
        if (!fieldsService.hasProfile()) {
          return resolvedPromise();
        }

        return Lookup.query({
          table: 'genders'
        }).$promise;
      },
      
      locations: function(fields) {
        if (!fieldsService.hasProfile()) {
          return resolvedPromise();
        }

        return Lookup.query({
          table: 'crossroadslocations'
        }).$promise;
      },

      profile: function(fields, contactId) {
        if (!fieldsService.hasProfile()) {
          return resolvedPromise();
        }

        return Profile.Person.get({
          contactId: contactId
        }).$promise;
      },
    };

    function resolvedPromise() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    }

    return {
      getInstance: function(params) {
        return $resolve.resolve(data, params);
      }
    };
  }
})();