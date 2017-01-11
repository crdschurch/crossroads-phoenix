import editGroupComponent from './editGroup.component';
import createGroupPreviewComponent from '../create_group/preview/createGroup.preview.component';
import createGroupComponent from '../create_group/createGroup.component';
import CONSTANTS from 'crds-constants';
/* jshint unused: false */
import createGroupHtml from '../create_group/createGroup.html';
import previewGroupHtml from '../create_group/preview/createGroup.preview.html';
import editGroupHtml from './editGroup.html';


export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL)
  .component('editGroup', editGroupComponent())
  ;