var app = angular.module('crossroads');
require('./braveAtHome.html');
require('./braveIntro2.html');
require('./braveIntro3.html');
require('./braveIntro4.html');
require('./braveRoom1.html');
require('./braveRoom2.html');
require('./braveRoom3.html');
require('./braveRoom4.html');
require('./braveRoom5.html');
require('./braveRoom6.html');
require('./braveReflect.html');
require('./braveHope.html');
require('./braveShare.html');

app.controller('BraveHomeController', require('./braveHome.controller'));
