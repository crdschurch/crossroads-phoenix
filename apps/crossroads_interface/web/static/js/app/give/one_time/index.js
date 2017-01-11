'use strict';

var constants = require('../../constants');

require('./templates/one_time_confirm.html');
require('./templates/one_time_account.html');
require('./templates/one_time_change.html');
require('./templates/one_time_thank_you.html');
require('./templates/one_time_login.html');

var app = angular.module(constants.MODULES.GIVE);

app.config(require('./one_time.routes'));
app.factory('OneTimeGiving', require('./one_time_giving.service'));
