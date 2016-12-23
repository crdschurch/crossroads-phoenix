export default class GroupURLService {
  /*@ngInject*/
  constructor($location) {
    this.location = $location;
  }

  shareUrl(groupId) {
    
    return $location.protocol() + '://' + $location.host() + '/trips/giving/' + groupId;

  }
}
