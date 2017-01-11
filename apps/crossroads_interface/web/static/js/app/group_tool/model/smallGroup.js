
import CONSTANTS from '../../constants';
import Address from './address';
import Participant from './participant';
import Category from './category';
import GroupType from './groupType';
import AgeRange from './ageRange';

export default class SmallGroup {

  constructor(jsonObject) {
    if (jsonObject) {
      this.createSubObjects(jsonObject);
      this.deleteSubObjects(jsonObject);
      Object.assign(this, jsonObject);
    }
  }

  createSubObjects(jsonObject) {
    this.address = (jsonObject.address === undefined || jsonObject.address === null) ? null : new Address(jsonObject.address);
    this.participants = [];
    if (jsonObject.Participants !== undefined && jsonObject.Participants != null) {
      this.participants =
        jsonObject.Participants.map((particpant) => {
          return new Participant(particpant);
        });
    }

    this.categories = this.mapSelectedMultiAttributes(CONSTANTS.GROUP.ATTRIBUTE_TYPE_ID, jsonObject.attributeTypes, Category);
    this.groupType = this.mapSingleAttribute(CONSTANTS.GROUP.GROUP_TYPE_ATTRIBUTE_TYPE_ID, jsonObject.singleAttributes, GroupType);

    let ageRanges = this.mapSelectedMultiAttributes(CONSTANTS.GROUP.AGE_RANGE_ATTRIBUTE_TYPE_ID, jsonObject.attributeTypes, AgeRange);
    if (ageRanges && ageRanges.length > 0) {
      this.ageRange = ageRanges;
    } else {
      this.ageRange = new AgeRange();
    }
    this.meetingDay = jsonObject.meetingDay;
    this.meetingTime = jsonObject.meetingTime;
    this.meetingFrequencyText = jsonObject.meetingFrequency;
    this.meetingFrequencyId = jsonObject.meetingFrequencyId;
    this.meetingTimeFrequency = this.getGroupCardWhenField();
  }

  mapSelectedMultiAttributes(attributeTypeId, attributeTypes, outputObj) {
    var selected = [];
    if (attributeTypes !== undefined && attributeTypes != null &&
      attributeTypes[attributeTypeId] !== undefined &&
      attributeTypes[attributeTypeId] != null &&
      attributeTypes[attributeTypeId].attributes !== undefined &&
      attributeTypes[attributeTypeId].attributes != null) {
      attributeTypes[attributeTypeId].attributes.forEach(function (attribute) {
        if (attribute.selected) {
          selected.push(new outputObj(attribute));
        }
      });
    }
    return selected;
  }

  mapSingleAttribute(attributeTypeId, attributeTypes, outputObj) {
    if (attributeTypes !== undefined && attributeTypes != null &&
      attributeTypes[attributeTypeId] !== undefined &&
      attributeTypes[attributeTypeId] != null &&
      attributeTypes[attributeTypeId].attribute !== undefined &&
      attributeTypes[attributeTypeId].attribute != null) {
      return new outputObj(attributeTypes[attributeTypeId].attribute);
    } else {
      return null;
    }
  }

  deleteSubObjects(jsonObject) {
    delete jsonObject.address;
    delete jsonObject.Participants;
  }

  leaders() {
    if (!this.participants) {
      return [];
    }
    return this.participants.filter((value) => {
      return value.isLeader();
    });
  }

  isLeader() {
    return this.groupRoleId === CONSTANTS.GROUP.ROLES.LEADER;
  }

  role() {
    if (this.groupRoleId === CONSTANTS.GROUP.ROLES.LEADER) {
      return 'Leader';
    } else if (this.groupRoleId === CONSTANTS.GROUP.ROLES.APPRENTICE) {
      return 'Apprentice';
    }

    return 'Participant';
  }

  visibility() {
    if (this.availableOnline === true) {
      return 'Public';
    } else {
      return 'Private';
    }
  }

  hasAddress() {
    return this.address !== undefined && 
            this.address !== null &&
            _.get(this.address, 'addressLine1', null) !== null &&
            _.get(this.address, 'city', null) !== null &&
            _.get(this.address, 'state', null) !== null &&
            _.get(this.address, 'zip', null) !== null;
  }

  meetingLocation() {
    if (!this.hasAddress()) {
      return 'Online';
    }

    return this.address.toString();
  }

  meetingZip() {
    return this.address.getZip();
  }

  mapCategories(jsonObject) {
    this.categories = this.mapSelectedMultiAttributes(CONSTANTS.GROUP.ATTRIBUTE_TYPE_ID, jsonObject, Category);
  }

  categoriesToString() {
    let categoriesString = this.categories.length > 0 ? `${this.categories[0]}` : '';

    for (let idx = 1; idx < this.categories.length; idx++) {
      categoriesString += `, ${this.categories[idx].toString()}`;
    }

    return categoriesString;
  }

  participantInGroup(participantContactID) {
    if (!participantContactID || !this.participants) {
      return false;
    } else if (_.find(this.participants, (participant) => { return participant.contactId == participantContactID })) {
      return true;
    }

    return false;
  }

  emailList() {
    let emailList = "";

    this.participants.forEach(function (participant, idx, array) {
      if (idx === array.length - 1) {
        emailList = `${emailList}${participant.email}`;
      }
      else {
        emailList = `${emailList}${participant.email},`;
      }
    }, emailList);

    return emailList;
  }

  getGroupCardWhenField() {
    let meetingDayStr = 'Flexible Meeting Time';
    if (this.meetingDay !== undefined && this.meetingDay !== null) {
      meetingDayStr = this.meetingDay + 's at ' + new moment(this.meetingTime, 'HH:mm:ss a').format('h:mm a') + ', ' + this.meetingFrequencyText;
    }
    return meetingDayStr;
  }
}
