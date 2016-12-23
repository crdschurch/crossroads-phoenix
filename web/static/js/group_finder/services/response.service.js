(function(){
  'use strict';

  module.exports = ResponseService;

  ResponseService.$inject = [];

  function ResponseService() {
    this.data = {};

    this.clear = function(){
      this.data = {};
    };

    this.getResponse = function(definition) {
      return this.data[definition.key];
    };

    this.getSingleAttributes = function(lookup) {
      // all defined single attributes, may or may not exist for all flows
      var singleAttributes = ['gender', 'goals', 'group_type', 'kids', 'marital_status', 'prior_participation'];
      var results = {};
      _.each(singleAttributes, function (index) {
        if (_.has(this.responses, index)) {
          var answer = this.responses[index];
          if (_.has(this.lookup, answer)) {
            var attributeTypeId = this.lookup[answer].attributeTypeId;
            results[attributeTypeId] = {'attribute': {'attributeId': answer}};
          }
        }
      }, {responses: this.data, lookup: lookup});

      return results;
    };

    this.getMultiAttributes = function(lookup, attributes) {
      var results = {};
      _.each(attributes, function(index) {
        if (_.has(this.responses, index)) {
          var answer = this.responses[index];
          _.each(answer, function(value, answerId) {
            if (value && _.has(this.lookup, answerId)) {
              var attributeTypeId = this.lookup[answerId].attributeTypeId;
              if (!_.has(results, attributeTypeId)) {
                results[attributeTypeId] = {attributeTypeId: attributeTypeId, attributes: []};
              }

              results[attributeTypeId].attributes.push({attributeId: answerId, selected: true});
            }
          }, {lookup: this.lookup});
        }
      }, {responses: this.data, lookup: lookup});

      return results;
    };

  }

})();
