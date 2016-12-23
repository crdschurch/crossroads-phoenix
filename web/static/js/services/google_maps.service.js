export default class GoogleMapsService {

  constructor($rootScope, $q) {
    if (typeof google !== 'undefined' && google && google.maps) {
      return;
    }

    let script   = document.createElement('script');
    script.type  = 'text/javascript';
    script.async = true;
    script.src   = 'https://maps.googleapis.com/maps/api/js?key=' + __GOOGLE_API_KEY__;

    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);

    this.apiKey    = __GOOGLE_API_KEY__;
    this.rootScope = $rootScope;
    this.q         = $q;
  }

  reverseGeocode(lat, lng) {
    let deferred = this.q.defer();

    if (typeof google === 'undefined' || !google || !google.maps) {
      let err = 'Google Maps API has not been loaded by init() method';
      deferred.reject(err);
    }

    let geocoder = new google.maps.Geocoder;

    geocoder.geocode({
      location: {
        lat: lat,
        lng: lng
      }
    }, (response, status) => {
      deferred.resolve(response);
    });

    return deferred.promise;
  }
}