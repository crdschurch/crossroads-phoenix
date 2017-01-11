export function getCamperInfo(CampsService, $state) {
  const camperId = $state.toParams.contactId;

  if (camperId === 'new') {
    return Promise.resolve();
  }

  const campId = $state.toParams.campId;
  return CampsService.getCamperInfo(campId, camperId);
}

export function getCampInfo(CampsService, $state) {
  const id = $state.toParams.campId;
  return CampsService.getCampInfo(id);
}

export function getCampProductInfo(CampsService, $state, $q) {
  const campId = $state.toParams.campId;
  const camperId = $state.toParams.contactId;
  if ($state.toParams.page === 'camps-payment') {
    const deferred = $q.defer();

    // if we are coming from the dashboard... don't check for previous payments
    const isUpdate = $state.toParams.update;
    // TODO:  figure out if we can determine if this has already been resolved...

    CampsService.getCampProductInfo(campId, camperId, !isUpdate).then(() => {
      deferred.resolve();
    }).catch((err) => {
      if (err.status === 302) {
        $state.go('campsignup.application', { page: 'camps-payment', contactId: camperId, campId, update: true, redirectTo: 'payment-confirmation' });
      }
      deferred.reject();
    });
    return deferred.promise;
  }

  return CampsService.getCampProductInfo(campId, camperId);
}

export function getCamperPayment(CampsService, $state) {
  const invoiceId = $state.toParams.invoiceId;
  const paymentId = $state.toParams.paymentId;
  return CampsService.getCampPayment(invoiceId, paymentId);
}

export function getCampMedical(CampsService, $state) {
  const campId = $state.toParams.campId;
  const contactId = $state.toParams.contactId;
  return CampsService.getCampMedical(campId, contactId);
}

export function getCamperFamily(CampsService, $state) {
  const id = $state.toParams.campId;
  return CampsService.getCampFamily(id);
}

export function getCampWaivers(CampsService, $state) {
  const campId = $state.toParams.campId;
  const contactId = $state.toParams.contactId;
  return CampsService.getCampWaivers(campId, contactId);
}

export function getShirtSizes(CampsService) {
  return CampsService.getShirtSizes();
}

export function checkApplicationExpiration(CampsService, $state, $q, $timeout, $log) {
  const deferred = $q.defer();

  const campId = $state.toParams.campId;
  const contactId = $state.toParams.contactId;

  CampsService.isEventParticipantInterested(contactId, campId)
    .then(() => {
      deferred.resolve();
    }, (error) => {
      $log.error('CampService application expiration check failed', error);
      deferred.resolve();
      $timeout(() => {
        $state.go('campsignup.family', { campId });
      }, 0);
    });

  return deferred.promise;
}
