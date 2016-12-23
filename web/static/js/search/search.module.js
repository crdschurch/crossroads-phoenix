'use strict';
var constants = require('../constants');

require('./search-results.html');

angular.module(constants.MODULES.SEARCH, ['crossroads.core', 'crossroads.common'])
  .config(require('./search.routes'))
  .factory('Search', require('./search.service'))
  .controller('SearchController', require('./search.controller'));
