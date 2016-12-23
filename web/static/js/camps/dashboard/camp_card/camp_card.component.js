import cardTemplate from './camp_card.html';
import campCardController from './camp_card.controller';

const CampCard = {
  bindings: {
    attendee: '<',
    startDate: '<',
    endDate: '<',
    paymentRemaining: '<',
    campTitle: '<',
    camperId: '<',
    campId: '<',
    campPrimaryContact: '<'
  },
  template: cardTemplate,
  controller: campCardController,
  controllerAs: 'campCard'
};

export default CampCard;
