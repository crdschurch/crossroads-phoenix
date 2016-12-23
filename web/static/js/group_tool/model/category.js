
export default class Category {

  constructor(jsonObject) {
    Object.assign(this, jsonObject);
  }

  toString() {
    return `${this.category} / ${this.name}`
  }
}