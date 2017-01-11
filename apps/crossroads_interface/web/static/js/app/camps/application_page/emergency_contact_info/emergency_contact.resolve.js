function getEmergencyContacts(CampsService, $stateParams) {
  const campId = $stateParams.campId;
  const contactId = $stateParams.contactId;
  return CampsService.getEmergencyContacts(campId, contactId);
}

export default getEmergencyContacts;
