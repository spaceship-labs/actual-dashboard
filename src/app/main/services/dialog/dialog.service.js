(function ()
{
    'use strict';

    angular
        .module('app.services')
        .factory('dialogService', dialogService);

    function dialogController($scope, $mdDialog){
      $scope.closeDialog = function (){
          $mdDialog.hide();
      }
    }

    dialogController.$inject = ['$scope','$mdDialog'];

    /** @ngInject */
    function dialogService($q, $log, $mdDialog){
        var service = {
            showDialog: showDialog
        };

        return service;

        function showDialog(message,ev){

          // Show the sent data.. you can delete this safely.
          $mdDialog.show({
              controller: dialogController,
              template           : '<md-dialog>' +
              '  <md-dialog-content><h1>' + message + '</h1></md-dialog-content>' +
              '  <md-dialog-actions>' +
              '    <md-button ng-click="closeDialog()" class="md-primary">' +
              '      Aceptar' +
              '    </md-button>' +
              '  </md-dialog-actions>' +
              '</md-dialog>',
              parent             : angular.element('body'),
              targetEvent        : ev,
              clickOutsideToClose: true
          });
        }
    }

})();
