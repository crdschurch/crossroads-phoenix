import CampController from './camp.controller';
import campTemplate from './camp.html';

const CrossroadsCamp = {
  bindings: {
    isSummerCamp: '='
  },
  template: campTemplate,
  controller: CampController,
  controllerAs: 'camp'
};

export default CrossroadsCamp;
