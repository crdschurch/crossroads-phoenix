
export default class GroupInquiry {

  constructor(jsonObject){
    if(jsonObject) {
      Object.assign(this, jsonObject);
    } else {
      this.groupId = undefined;
      this.contactId = undefined;
      this.inquiryId = undefined;
      this.emailAddress = undefined;
      this.phoneNumber = undefined;
      this.firstName = '';
      this.lastName = '';
      this.requestDate = undefined;
      this.placed = undefined;
      this.imageUrl = undefined;
      this.defaultProfileImageUrl = undefined;
    }

    this.nickName = this.firstName;
  }

  recipientName() {
    return `${this.firstName} ${this.lastName}`;
  }
}