import controller from './currentSeries.controller';

CurrentSeriesComponent.$inject = [];

export default function CurrentSeriesComponent() {

  let currentSeriesComponent = {
    restrict: 'E',
    templateUrl: 'current_series/currentSeries.html',
    controller: controller,
    controllerAs: 'currentSeries',
    bindToController: true
  }

  return currentSeriesComponent;
}