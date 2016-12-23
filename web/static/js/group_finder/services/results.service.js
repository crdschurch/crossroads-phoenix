(function() {
  'use strict';

  module.exports = ResultsService;

  ResultsService.$inject = ['Group', 'Address', 'GROUP_API_CONSTANTS', '$q', 'GoogleDistanceMatrixService', '$timeout'];

  function ResultsService(Group, Address, GROUP_API_CONSTANTS, $q, GoogleDistanceMatrixService, $timeout) {
    var requestPromise = null;
    var results = {};
    var groups = [];
    var retryCount = 0;

    results.loadResults = loadResults;
    results.clearData = clearData;
    results.getResults = getResults;

    function loadResults(participant) {
      if (!requestPromise) {

        var searchPromise = Group.Search.save({groupTypeId: GROUP_API_CONSTANTS.GROUP_TYPE_ID}, participant).$promise;
        var loadedPromise = searchPromise.then(function(results) {
          clearData();

          groups = _.map(results, function(group) {
            group.editProfilePicture = false;
            group.time = displayTime(group.meetingDayId, group.meetingTime);
            group.description = group.groupDescription;
            group.id = group.groupId;
            group.groupTitle = groupTitle(group.contactName);
            group.mapLink = Address.mapLink(group.address);

            if (_.has(group.singleAttributes, '73')) {
              group.groupType = group.singleAttributes[73].attribute.description;
            }

            group.attributes = [];

            //
            // check attributes for pets and kids
            //
            _.each(group.attributeTypes, function(attribute) {
              if (attribute.name === 'Pets') {
                _.each(attribute.attributes, function(type) {
                  if (type.selected && type.name) {
                    if (type.name.indexOf('dog') !== -1) { group.attributes.push('has a dog'); }

                    if (type.name.indexOf('cat') !== -1) { group.attributes.push('has a cat'); }
                  }
                });
              }
            });

            if (_.has(group.singleAttributes, '75') && group.singleAttributes[75].attribute.attributeId === 7017) {
              group.attributes.push('kids welcome');
            }

            return group;
          });

          return groups;
        });

        var distancePromise = loadedPromise.then(function(groups) {
          return loadDistance(groups, participant);
        });

        var sortPromise = distancePromise.then(function() {
          // Not sure how to get groups from promise results since returning a promise and not data
          // grabing 'groups' variable from function scope instead
          groups = sortByDistance(groups);
        });

        requestPromise = sortPromise;
      }

      return requestPromise;
    }

    function getDistanceForChunk(participantAddress, hostAddresses, chunk, deferred) {
      GoogleDistanceMatrixService.distanceFromAddress(participantAddress, hostAddresses)
        .then(function(result) {

          _.forEach(chunk, function(group, index) {
            var resultDistance = result[index].distance;
            if (resultDistance) {
              group.distance = Math.round((resultDistance.value / 1609.344) * 10) / 10;
            }
          });

          deferred.resolve();
        })
        .catch(function(reason) {
          var isOverLimit =  reason.indexOf('OVER_QUERY_LIMIT') > -1;

          if (!isOverLimit) {
            deferred.reject('Failed to load distance due to error ' + reason);
            return;
          }

          if (retryCount >= 150) {
            deferred.reject('Failed to load distance after ' + retryCount + ' retries.');
            return;
          }

          $timeout(function(chunk, participantAddress, hostAddresses, deferred) {
            getDistanceForChunk(participantAddress, hostAddresses, chunk, deferred);
          }, 2000, true, chunk, participantAddress, hostAddresses, deferred);

          retryCount++;
        });

      return deferred.promise;
    }

    function loadDistance(groups, participant) {
      var chunkedGroups = _.chunk(groups, 25);
      retryCount = 0;

      var previousDeferred = $q.defer();
      previousDeferred.resolve();

      _.forEach(chunkedGroups, function(chunk) {
        var participantAddress = participant.address.addressLine1 + ', ' +
          participant.address.city + ', ' +
          participant.address.state + ', ' +
          participant.address.zip;

        var hostAddresses = _.map(chunk, function(group) {
          return group.address.addressLine1 + ', ' +
            group.address.city + ', ' +
            group.address.state + ', ' +
            group.address.zip;
        });

        var deferred = $q.defer();

        previousDeferred.promise.then(function() {
          getDistanceForChunk(participantAddress, hostAddresses, chunk, deferred);
        });

        previousDeferred = deferred;
      });

      return previousDeferred.promise;
    }

    function sortByDistance(groups) {
      return _.sortBy(groups, function(group) {
        return group.distance;
      });
    }

    function displayTime(day, time) {
      var _time = time.split(':');
      var format = 'dddd[s] @ h:mm a';
      if (parseInt(_time[1]) === 0) {
        format = 'dddd[s] @ h a';
      }

      return moment().isoWeekday(day - 1).hour(_time[0]).minute(_time[1]).format(format);
    }

    function groupTitle(name) {
      var _name = name.split(', ');
      return _name[1] + ' ' +  _name[0][0] + '.';
    }

    function clearData() {
      requestPromise = null;
      groups = [];
    }

    function getResults() {
      return groups;
    }

    return results;
  }

})();
