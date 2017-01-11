(function() {
  'use strict';

  module.exports = ChildcareEvents;

  ChildcareEvents.$inject = ['$resource'];

  /**
   * Stores a single event or a collection of events
   * that should be resolved in the routes of childcare
   */
  function ChildcareEvents($resource) {

    var childCareEvents = {
      childcareEvent: {},
      children: [],
      event: {},
      events: [],
      setChildcareEvent: setChildcareEvent,
      setChildren: setChildren,
      setEvent: setEvent,
      setEvents: setEvents
    };

    function setChildcareEvent(event) {
      if (typeof event === 'object') {
        childCareEvents.childcareEvent = event;
      } else {
        throw(new Error('this must be a single object'));
      }
    }

    function setChildren(children) {
      if (children.constructor === Array) {
        childCareEvents.children = children;
      } else {
        throw(new Error('this must be an array '));
      }
    }

    function setEvent(event) {
      if (typeof event === 'object') {
        childCareEvents.event = event;
      } else {
        throw(new Error('this must be a single object'));
      }
    }

    function setEvents(events) {
      if (events.constructor === Array) {
        childCareEvents.events = events;
      } else {
        throw(new Error('this must be an array '));
      }
    }

    return childCareEvents;
  }
})();
