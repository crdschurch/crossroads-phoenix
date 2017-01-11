import dashboardTemplate from './camps_dashboard.html';
import campsDashboardController from './camps_dashboard.controller';

const CampsDashboard = {
  bindings: {},
  template: dashboardTemplate,
  controller: campsDashboardController,
  controllerAs: 'dashboard'
};

export default CampsDashboard;
