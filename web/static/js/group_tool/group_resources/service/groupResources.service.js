
import GroupResourceCategory from '../model/groupResourceCategory';

export default class GroupResourcesService {
  /*@ngInject*/
  constructor($log, $resource) {
    this.log = $log;
    this.resource = $resource;
  }
  
  getGroupResources() {
    let promised = this.resource(`${__CMS_ENDPOINT__}api/groupresourcecategory`).
      get().$promise;

    return promised.then((data) => {
      let resources = data.groupresourcecategories.map((resource) => {
        return new GroupResourceCategory(resource);
      });

      return resources;
    }, (err) => {
      this.log.error(`Error getting group resources: ${err}`);
      throw err;
    });
  }
}