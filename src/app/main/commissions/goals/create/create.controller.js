(function ()
{
    'use strict';

    angular
        .module('app.commissions.goals.edit')
        .controller(
          'CommissionsGoalsCreateController',
          CommissionsGoalsCreateController
        );

    /** @ngInject */
      function CommissionsGoalsCreateController(
        $mdDialog,
        $scope,
        dialogService,
        userService,
        roleService,
        goalService
      ){
        var vm         = this;
        vm.goal        = {};
        vm.roles       = [];
        vm.isLoading   = false;
        vm.sendForm    = sendForm;

        activate();

        function activate() {
          roleService.getRoles().then(function(res) {
            vm.roles = res.data;
          });
        }

        function sendForm(valid) {
          if (vm.isLoading || !valid) {
            return;
          }
          vm.isLoading = true;
          goalService
            .create(vm.goal).then(function(res){
              showConfirm();
              $scope.basicForm.$submitted = false;
              vm.goal        = {};
              vm.isLoading = false;
            }).
            catch(function(err) {
              showError();
              vm.isLoading = false;
            });
        }

        function showConfirm(){
          var alert = $mdDialog.alert({
            title: 'Reto',
            textContent: 'Datos guardados exitosamente',
            ok: 'Close'
          });
          $mdDialog.show(alert);
        }

        function showError() {
           var alert = $mdDialog.alert({
            title: 'Reto',
            textContent: 'Hubo un problema, por favor reintente más tarde',
            ok: 'Close'
          });
          $mdDialog.show(alert);
        }
    }
})();
