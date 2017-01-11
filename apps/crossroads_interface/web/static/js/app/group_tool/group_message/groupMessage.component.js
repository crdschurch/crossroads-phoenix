
import controller  from './groupMessage.controller';

GroupMessageComponent.$inject = [ ];

export default function GroupMessageComponent() {

  let GroupMessageComponent = {
    restrict: 'E',
    bindings: {
      person: '<',
      normalLoadingText: '@',
      loadingLoadingText: '@',
      header: '@',
      subHeaderText: '@',
      contactText: '@',
      emailTemplateText: '@',
      emailMessageLabel: '@',
      emailMessageRequired: '@',
      cancelAction: '&',
      submitAction: '&',
      processing: '<',
    },
    templateUrl: 'group_message/groupMessage.html', 
    controller: controller,
    controllerAs: 'groupMessage',
    bindToController: true
  };

  return GroupMessageComponent;

}