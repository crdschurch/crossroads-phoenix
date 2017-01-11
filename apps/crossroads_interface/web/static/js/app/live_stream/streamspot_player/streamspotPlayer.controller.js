
export default class StreamspotPlayerController {

  constructor(StreamspotService, $rootScope) {
    this.streamspotService = StreamspotService;
    this.rootScope = $rootScope;

    this.debug = false;
    this.markup = '';
  }

  $onInit() {
    this.streamspotService.getBroadcaster().then((response) => {
      if (response.success === true && response.data.broadcaster !== undefined) {
        const playerSrc = this.setPlayerSrc(response.data.broadcaster);
        if (playerSrc) {
          document.getElementById('streamspot-iframe').src = playerSrc;
        }
      }
      else {
        console.error('StreamSpot API Failure!');
      }
    });
  }

  setPlayerSrc(broadcaster) {
    let defaultPlayer;
    if (broadcaster.players === undefined || broadcaster.players.length === 0) {
      return false;
    }

    broadcaster.players.forEach((element) => {
      if (element.default === true) {
        defaultPlayer = element;
        return false;
      }
      return true;
    });

    if (defaultPlayer === undefined) {
      defaultPlayer = broadcaster.players[0];
    }

    if (broadcaster.isBroadcasting === true || this.debug) {
      return `https://player2.streamspot.com/?playerId=${__STREAMSPOT_PLAYER_ID__}`;
    }
    return false;
  }
}