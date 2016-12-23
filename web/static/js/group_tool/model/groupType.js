
export default class GroupType {

  constructor(jsonObject) {
    if(jsonObject) {
      Object.assign(this, jsonObject);
    } else {
      this.name = '';
      this.description = '';
    }
  }
}