OpportunityCapacityService.$inject = ['$resource'];

export default function OpportunityCapacityService($resource) {
  return $resource(__API_ENDPOINT__ + 'api/serve/opp-capacity');
}
