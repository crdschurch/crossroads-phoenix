'use strict';

var constants = require('../../constants');

require('./templates/recurring_account.html');
require('./templates/recurring_thank_you.html');
require('./templates/recurring_login.html');

var app = angular.module(constants.MODULES.GIVE);

app.config(require('./recurring.routes'));
app.factory('RecurringGiving', require('./recurring_giving.service'));
