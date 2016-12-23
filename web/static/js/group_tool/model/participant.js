
import constants from 'crds-constants';

export default class Participant {

  constructor(jsonObject) {
    if(jsonObject) {
      Object.assign(this, jsonObject);
    } else {
      this.groupRoleId = -1;
      this.nickName = '';
      this.lastName = '';
    }
  }

  isLeader() {
    return this.groupRoleId === constants.GROUP.ROLES.LEADER; 
  }

  isApprentice() {
    return this.groupRoleId === constants.GROUP.ROLES.APPRENTICE; 
  }

  getDisplayName() {
    return `${this.nickName} ${this.lastName}`.replace(/^\s+|\s+$/g,'');
  }

  compareTo(other) {
    let leaderNumThis = this.isLeader() ? 0 : (this.isApprentice() ? 1 : 2);
    let compareStringThis = `${leaderNumThis} ${this.lastName ? this.lastName.toUpperCase() : ''} ${this.nickName ? this.nickName.toUpperCase() : ''}`;
    let leaderNumOther = other.isLeader() ? 0 : (other.isApprentice() ? 1 : 2);
    let compareStringOther = `${leaderNumOther} ${other.lastName ? other.lastName.toUpperCase() : ''} ${other.nickName ? other.nickName.toUpperCase() : ''}`;

    if(compareStringThis > compareStringOther) {
      return 1;
    } else if(compareStringThis < compareStringOther) {
      return -1;
    } else {
      return 0;
    }
  }
}