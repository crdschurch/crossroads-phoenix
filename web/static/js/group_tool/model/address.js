
export default class Address {

  constructor(jsonObject) {
    Object.assign(this, jsonObject);
  }

  toString() {
    if(this.zip === null) {
      return 'Online';
    }
    else if(this.addressLine2 === null || this.addressLine2 === '' || this.addressLine2 === 'undefined') {
      return `${this.addressLine1}, ${this.city} ${this.state}, ${this.zip}`;
    }

    return `${this.addressLine1}, ${this.addressLine2}, ${this.city} ${this.state}, ${this.zip}`;
  }

  toSearchString() {
    let components = [
      this.addressLine1,
      this.addressLine2,
      this.city,
      this.state,
      this.zip
    ];
    return components.filter((c) => {
      return c && c.trim().length > 0;
    }).join(', ');
  }

  getZip() {
    if (this.zip === null){
      return 'Online';
    }
    return `${this.zip}`;
  }
}