import EmbedController from './embed.controller';
import html from './embed.html';

export default function EmbedComponent() {
  const embedComponent = {
    restrict: 'EA',
    template: html,
    controller: EmbedController,
    controllerAs: 'ctrl'
  };
  return embedComponent;
}