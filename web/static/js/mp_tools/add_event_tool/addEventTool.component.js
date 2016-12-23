import controller from './addEventTool.controller';
import './add_event_tool.html';

export default function CreateAddEventComponent() {

  let addEventComponent = {
      restrict: 'E',
      scope: {},
      controller: controller,
      controllerAs: 'addEvent',
      bindToController: true,
      templateUrl: 'add_event_tool/add_event_tool.html'
  };

  return addEventComponent;
}