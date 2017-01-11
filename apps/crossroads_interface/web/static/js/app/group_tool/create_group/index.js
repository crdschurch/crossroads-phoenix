import createGroupComponent from './createGroup.component';
import createGroupPreviewComponent from './preview/createGroup.preview.component';
import CONSTANTS from 'crds-constants';
/* jshint unused: false */
import createGroupHtml from './createGroup.html';
import previewGroupHtml from './preview/createGroup.preview.html';
/*import createGroupPreview from './preview/createGroup.preview.component';*/

export default angular.
  module(CONSTANTS.MODULES.GROUP_TOOL)
  .component('createGroup', createGroupComponent())
  .component('createGroupPreview', createGroupPreviewComponent())
  ;

