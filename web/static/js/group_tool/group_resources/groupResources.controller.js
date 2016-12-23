
export default class GroupResourcesController {
  /*@ngInject*/
  constructor(GroupResourcesService, $rootScope) {
    this.groupResourcesService = GroupResourcesService;
    this.rootScope = $rootScope;
    this.categories = [];
    this.ready = false;
  }

  $onInit() {
    this.groupResourcesService.getGroupResources().then((categories) => {
      // Filter off any categories without resources - in case anyone wants to
      // add categories before they have resources ready for the category.
      this.categories = categories.filter((cat) => {
        return cat.hasResources() === true;
      }).sort((a, b) => {
        return a.compareTo(b);
      });
    }, (/*err*/) => {
      this.categories = [];
    }).finally(() => {
      this.ready = true;
    });
  }

  hasData() {
    return this.categories.length > 0;
  }

  getCategories() {
    return this.categories;
  }
}