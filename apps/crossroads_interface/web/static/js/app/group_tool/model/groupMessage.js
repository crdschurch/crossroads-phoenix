
import constants from 'crds-constants';

export default class GroupMessage {

    constructor(jsonObject) {
        if(jsonObject) {
            Object.assign(this, jsonObject);
        } else {
            this.groupId = '';
            this.subject = '';
            this.body = '';
        }
    }

}