// Based on http://angular-formly.com/#/example/advanced/repeating-section
/* eslint-disable no-param-reassign */
/* @ngInject */
function campsMedicinesFormlyConfig(formlyConfigProvider) {
  let unique = 1;
  formlyConfigProvider.setType({
    name: 'campMedicines',
    templateUrl: 'medical_info/camp_medicines.html',
    controller: ($scope, MedicalInfoForm) => {
      function addNew() {
        $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
        const repeatsection = $scope.model[$scope.options.key];
        const lastSection = repeatsection[repeatsection.length - 1];
        let newsection = {};
        if (lastSection) {
          newsection = {
            medicalInformationMedicationId: 0,
            dosage: undefined,
            medicationName: undefined,
            medicationType: undefined,
            timeOfDay: undefined
          };
        }
        repeatsection.push(newsection);
      }

      // eslint-disable-next-line no-unused-vars
      function remove($index) {
        if ($scope.model[$scope.options.key].length > 1) {
          if ($scope.model[$scope.options.key][$index].medicalInformationMedicationId > 0) {
            const deleteExists = $scope.model[$scope.options.key][$index];
            const toDelete = Object.assign(deleteExists, { remove: true });
            MedicalInfoForm.form.deletedMedicines.push(toDelete);
          }
          $scope.model[$scope.options.key].splice($index, 1);
        }
      }

      // eslint-disable-next-line no-unused-vars
      function showTrash($index) {
        return $index > 0 || $scope.model[$scope.options.key].length > 1;
      }


      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      function addRandomIds(fields) {
        unique += 1;
        angular.forEach(fields, (field, index) => {
          if (field.fieldGroup) {
            addRandomIds(field.fieldGroup);
            return;
          }

          if (field.templateOptions && field.templateOptions.fields) {
            addRandomIds(field.templateOptions.fields);
          }

          field.id = field.id || (`${field.key}_${index}_${unique}${getRandomInt(0, 9999)}`);
        });
      }

      function copyFields(fields) {
        fields = angular.copy(fields);
        addRandomIds(fields);
        return fields;
      }

      // init
      if ($scope.model[$scope.options.key] && $scope.model[$scope.options.key].length === 0) {
        addNew();
      }

      $scope.fields = copyFields($scope.to.fields);

      $scope.remove = remove;
      $scope.showTrash = showTrash;
      $scope.formOptions = { formState: $scope.formState };
      $scope.addNew = addNew;
      $scope.copyFields = copyFields;
    }
  });
}
/* eslint-enable */
export default campsMedicinesFormlyConfig;
