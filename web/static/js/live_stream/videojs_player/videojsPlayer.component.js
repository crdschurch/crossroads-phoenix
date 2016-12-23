import controller from './videojsPlayer.controller';

VideojsPlayer.$inject = [];

export default function VideojsPlayer() {

  let videojsPlayer = {
    restrict: 'E',
    templateUrl: 'videojs_player/videojsPlayer.html',
    controller: controller,
    controllerAs: 'player',
    bindToController: true
  }

  return videojsPlayer;
}