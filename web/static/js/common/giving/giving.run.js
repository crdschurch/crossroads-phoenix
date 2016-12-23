(function() {
  'use strict()';
  module.exports = GivingRun;

  GivingRun.$inject = [];

  function GivingRun() {
    var stripeVersion = __STRIPE_API_VERSION__;
    if (stripeVersion) {
      Stripe._customHeaders = {'Stripe-Version': stripeVersion};
    }
  }
})();
