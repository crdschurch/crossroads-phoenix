(function() {
  'use strict';

  module.exports = changeProfileImageCtrl;

  changeProfileImageCtrl.$inject = ['$modalInstance', '$scope', '$timeout'];
    
  function changeProfileImageCtrl($modalInstance, $scope, $timeout) {

    var vm = this;

    vm.ok = ok;
    vm.cancel = cancel;
    vm.focus = focus;
    vm.handleFileSelect = handleFileSelect;
    vm.myImage = '';
    vm.myCroppedImage = '';
    vm.init = false;

    function handleFileSelect(evt) {
      var options = {
      };
     var file = evt.currentTarget.files[0];

     loadImage.parseMetaData(file, function (data) {
        if (data.exif) {
            options.orientation = data.exif.get('Orientation');
        }
      }); 

      var reader = new FileReader();
      
      reader.onload = function(readFile) {
        loadImage(
          readFile.target.result,
          function(f) {
            $scope.$apply(function($scope) {
              vm.myImage = f.src || f.toDataURL();
            });
          },
          options
        );
      };

      reader.readAsDataURL(file);
    }

    $timeout(function() {
      angular.element(document.querySelector('#fileInputModal')).on('change', handleFileSelect);
    });

    function ok() {
      $modalInstance.close(vm.myCroppedImage);
      vm.init = false;
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
      vm.init = false;
    }

    function focus() {
      $timeout(function() {
        if (vm.init && angular.element(document.querySelector('#fileInputModal'))[0].files.length === 0) {
          cancel();
        }

        vm.init = true;
      }, 200);
    }
  }
})();
