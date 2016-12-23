(function() {
  'use strict';

  module.exports = ImageService;

  Image.$inject = ['$resource', '$cookies'];

  function ImageService($resource, $cookies) {
    return {
      Image: $resource(__API_ENDPOINT__ + 'api/image/:id'),
      ProfileImage: $resource(__API_ENDPOINT__ + 'api/image/profile/:id'),
      ProfileImageBaseURL: __API_ENDPOINT__ + 'api/image/profile/',
      ImageBaseURL: __API_ENDPOINT__ + 'api/image/',
      PledgeCampaignImageBaseURL: __API_ENDPOINT__ + 'api/image/pledgecampaign/',
      PledgeCampaignImage: $resource(this.PledgeCampaignImageBaseURL + ':id'),
      DefaultProfileImage: '//crossroads-media.imgix.net/images/avatar.svg'
    };
  }
})();
