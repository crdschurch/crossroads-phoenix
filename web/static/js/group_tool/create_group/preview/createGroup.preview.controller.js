
export default class CreateGroupPreviewController {
  /*@ngInject*/
  constructor(GroupService, CreateGroupService, ImageService, $state, $log, $rootScope) {
    this.groupService = GroupService;
    this.createGroupService = CreateGroupService;
    this.imageService = ImageService;
    this.state = $state;
    this.log = $log;
    this.rootScope = $rootScope;

    this.defaultProfileImageUrl = this.imageService.DefaultProfileImage;
    this.ready = false;
    this.error = false;
    this.edit = false;
    this.saving = false;
  }

$onInit() {
  this.groupData = this.createGroupService.mapToSmallGroup();
  this.edit = this.groupData.groupId == null || this.groupData.groupId == undefined ? false : true;
   this.stateChangeWatcher = this.rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
           if (!toState.name.startsWith('grouptool.edit') && !toState.name.startsWith('grouptool.create'))
           {
               this.createGroupService.reset();
               this.stateChangeWatcher();
               return;
           }
       });
 }



save() {
  this.saving = true;
  this.successfulSave = false;
  try {
    var promise = this.groupService.saveCreateGroupForm(this.groupData)
      .then((data) => {
        return this.groupService.saveParticipant(this.groupData.participants, data.groupId);
      })
      .then((data) => {
        return this.groupService.saveProfile(this.groupData.profile);
      })
      .then((data) => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolCreateGroupSuccess);
        this.saving = false;
        this.successfulSave = true;
        this.createGroupService.reset();
        this.state.go('grouptool.mygroups')
      })
  }
  catch (error) {
    this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
    this.saving = false;
    this.successfulSave = false;
    throw (error);
  }

}

saveEdits() {
  this.saving = true;
  this.successfulSave = false;
  try {
    var promise = this.groupService.saveEditGroupForm(this.groupData)
      .then((data) => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolEditGroupSuccess);
        this.saving = false;
        this.successfulSave = true;
        this.createGroupService.reset();
        this.state.go('grouptool.mygroups')
      })
  }
  catch (error) {
    this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
    this.saving = false;
    this.successfulSave = false;
    throw (error);
  }

}

submit() {
  this.edit ? this.saveEdits() : this.save();
}

}
