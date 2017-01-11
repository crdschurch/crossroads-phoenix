export default class SocialSharingController {
  constructor() {

    addthis.init();
    addthis.toolbox(angular.element.find('social-sharing'), 
      {pubid: 'ra-5391d6a6145291c4'}, 
      {
        url: this.url || window.location.href,
        title: this.title || document.querySelector('meta[property="og:title"]')['content'],
        description: this.description || document.querySelector('meta[property="og:description"]')['content']
      });
  }

  $onInit() {
   
  }
}