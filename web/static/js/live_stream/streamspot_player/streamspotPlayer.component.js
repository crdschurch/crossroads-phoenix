import controller from './streamspotPlayer.controller';

StreamspotPlayer.$inject = [];

export default function StreamspotPlayer() {

  let streamspotPlayer = {
    restrict: 'E',
    templateUrl: 'streamspot_player/streamspotPlayer.html',
    controller: controller,
    controllerAs: 'player',
    bindToController: true
  }

  return streamspotPlayer;
}