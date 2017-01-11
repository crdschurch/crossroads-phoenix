
export default class Geolocation {
  constructor(lat, lng, count, zipcode) {
    this.lat = lat;
    this.lng = lng;
    this.count = count;
    this.zipcode = zipcode;
  }

  static build(object) {
    let lat     = object['lat'];
    let lng     = object['lng'];
    let count   = object['count'];
    let zipcode = object['zipcode'];

    return new Geolocation(lat, lng, count, zipcode);
  }

  static blank() {
    return new Geolocation('', '', 0, '');
  }

}
