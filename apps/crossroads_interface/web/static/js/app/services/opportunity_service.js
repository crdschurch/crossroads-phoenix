(function(){
  module.exports = Opportunity;

  Opportunity.$inject = ['$resource'];

  function Opportunity($resource){
    return {
      GetResponse: $resource(__API_ENDPOINT__ + 'api/opportunity/getResponseForOpportunity/:id/:contactId')
    }
  }
})();
