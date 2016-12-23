(function() {
  'use strict';

  module.exports = UniqueEquipment;

  UniqueEquipment.$inject = [];

  function UniqueEquipment() {

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, el, attr, ctrl) {
        ctrl.$validators.uniqueEquipment = function(value) {
          if (ctrl.equipmentRequired && scope.equipment.currentEquipment !== undefined &&
              scope.equipment.currentEquipment.length > 0 &&
              value != null &&
              _.has(value, 'name')) {
            var exists = _.find(scope.equipment.currentEquipment, function(e) {
              if (e.equipment.name !== undefined && e.equipment.name !== null) {
                return e.equipment.name.id === value.id;
              }

              return false;
            });

            return exists === undefined;
          }

          return true;
        };
      }
    };
  }
})();
