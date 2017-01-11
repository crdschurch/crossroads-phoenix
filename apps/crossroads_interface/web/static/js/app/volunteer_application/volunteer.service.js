(function(){
  module.exports = VolunteerService;

  VolunteerService.$inject = ['$resource'];

  function VolunteerService($resource){
    return {
    	SaveStudent: $resource(__API_ENDPOINT__ + 'api/volunteer-application/student'),
      SaveAdult: $resource(__API_ENDPOINT__ + 'api/volunteer-application/adult'),
      Family: $resource(__API_ENDPOINT__ + 'api/volunteer-application/family/:contactId')
    }
  }
})();
