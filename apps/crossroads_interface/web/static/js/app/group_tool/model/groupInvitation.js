
import CONSTANTS from 'constants';

export default class GroupInvitation {

  constructor(jsonObject){
    if(jsonObject) {
      Object.assign(this, jsonObject);
    } else {
      this.sourceId = undefined;
      this.groupRoleId = undefined;
      this.emailAddress = undefined;
      this.customMessage = undefined;
      this.recipientName = undefined;
      this.requestDate = undefined;
      this.imageUrl = undefined;
    }

    // Always set to a Group invitation type    
    this.invitationType = CONSTANTS.INVITATION.TYPES.GROUP;
  }
}
