import TripDepositController from './tripDeposit.controller';

require('./tripDeposit.html');
require('./templates/tripDepositAccount.html');
require('./templates/tripDepositChange.html');
require('./templates/tripDepositConfirm.html');
require('./templates/tripDepositThanks.html');


let TripDeposit = {
  bindings: {},
  templateUrl: 'tripDeposit/tripDeposit.html',
  controller: TripDepositController,
  controllerAs: 'tripDeposit'
};

export default TripDeposit;
