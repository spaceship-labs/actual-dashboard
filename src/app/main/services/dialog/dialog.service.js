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
    function dialogService($q, $log, $mdDialog, $window, $location, $rootScope){
        var service = {
            showDialog: showDialog,
            showDestroyDialog: showDestroyDialog
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

        function showDestroyDialog(ev, destroyPromise,id, redirectUrl){
          var redirect = redirectUrl || false;
          var confirm = $mdDialog.confirm()
                .title('Eliminar')
                .textContent('¿Deseas eliminar este registro?')
                .ariaLabel('Eliminar')
                .targetEvent(ev)
                .ok('Eliminar')
                .cancel('Cancelar');
          $mdDialog.show(confirm).then(function() {
            $rootScope.$emit('destroyingItemStart', true);
            destroyPromise(id).then(function(res){
              console.log(res);
              $rootScope.$emit('destroyingItemEnd', true);

              if(redirect){
                console.log('redirecting');
                $location.path(redirect);
              }else{
                console.log('reloading');
                $window.location.reload();
              }
            }, function(err){
              $rootScope.$emit('destroyingItemEnd', true);
              console.log(err);
            });
          }, function() {
            $scope.status = 'You decided to keep your debt.';
          });

        }
    }

})();
