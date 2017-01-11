
export default class AgeRange {

  constructor(jsonObject) {
    if(jsonObject) {
      Object.assign(this, jsonObject);
    } else {
      this.name = '';
      this.description = '';
    }
  }

  toString() {
    return this.name;
  }  
}