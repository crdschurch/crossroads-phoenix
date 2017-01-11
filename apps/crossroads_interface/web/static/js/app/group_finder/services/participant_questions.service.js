(function(){
  'use strict';

  module.exports = ParticipantQuestionsService;

  ParticipantQuestionsService.$inject = ['Page', 'AUTH_EVENTS', '$rootScope', 'QA_PAGES'];

  function ParticipantQuestionsService(Page, AUTH_EVENTS, $rootScope, QA_PAGES) {
    var promise = null;
    var service = {};
    service.questions = [];
    service.lookup = {};
    service.loadQuestions = loadQuestions;
    service.getLookup = getLookup;
    service.getQuestions = getQuestions;
    service.lookupContains = lookupContains;
    service.showUpsell = showUpsell;

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, clearData);

    function loadQuestions() {
      if (!promise) {
        promise = Page.get({url: QA_PAGES.JOIN}).$promise;
        promise.then(function(data) {
          service.questions = _.each(data.pages[0].fields, function(question) {
            question.key = question.name;
            question.required = parseInt(question.required) === 1;
            delete question.name;

            switch (question.className) {
              case 'EditableAddressField': question.input_type = 'address'; break;
              case 'EditableCheckboxGroupField': question.input_type = 'checkbox'; break;
              case 'EditableDatetimeField': question.input_type = 'date_and_time'; break;
              case 'EditableNumericField': question.input_type = 'number'; break;
              case 'EditableRadioField': question.input_type = 'radio'; break;
              case 'EditableTextField': question.input_type = 'textarea'; break;
            }

            if (_.has(question, 'attributeType') && question.attributeType) {
              question.answers = _.map(question.attributeType.attributes, function(attribute) {
                service.lookup[attribute.attributeId] = {
                  name: attribute.name,
                  attributeTypeId: this.attributeTypeId,
                  description: attribute.description
                };
                return { id: attribute.attributeId, name: attribute.name };
              }, {attributeTypeId: question.attributeType.attributeTypeId});
            }
          });
          service.lookup.loaded = true;
        });
      }

      return promise;
    }

    function getQuestions() {
      var loadPromise = loadQuestions();
      return loadPromise.then(function() {
        return service.questions;
      });
    }

    function getLookup() {
      var loadPromise = loadQuestions();
      return loadPromise.then(function() {
        return service.lookup;
      });
    }

    function lookupContains(id, keyword) {
      var contains = false;
      if (id) {
        contains = service.lookup[id].name.toLowerCase().indexOf(keyword) > -1;
      }

      return contains;
    }

    function clearData() {
      promise = null;
      delete service.questions;
      delete service.lookup;
    }

    function showUpsell(prior_participation) {
      return lookupContains(prior_participation, 'yes') || lookupContains(prior_participation, 'once');
    }

    return service;
  }

})();
