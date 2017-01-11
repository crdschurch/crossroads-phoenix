export default class GroupDetailParticipantCardController {
  /*@ngInject*/
  constructor(ImageService) {
    this.imageService = ImageService;
  }

  $onInit() {
    this.defaultProfileImageUrl = this.imageService.DefaultProfileImage;
  }

  invokeDeleteAction(participant) {
    this.deleteAction({participant: participant});
  }

  invokeRoleAction(participant) {
    this.roleAction({participant: participant});
  }
}