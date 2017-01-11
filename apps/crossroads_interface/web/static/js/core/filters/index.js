(function() {
  var app = angular.module('crossroads.core');
  app.filter('time', require('./time.filter'));
  app.filter('htmlToPlainText', require('./html_to_plain_text.filter'));
  app.filter('htmlReplaceEntities', require('./replace_html_entities.filter'));
  app.filter('yesNo', require('./bool_to_yes_no.filter'));
  require('./html.filter');
  require('./truncate.filter');
})();
