module.exports = function($resource, Session) {
    return $resource(__API_ENDPOINT__ + "api/opportunity/:opportunityId");
};
