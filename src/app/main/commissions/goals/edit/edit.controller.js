(function ()
{
    'use strict';

    angular
        .module('app.commissions.goals.edit')
        .controller('CommissionsGoalsEditController', CommissionsGoalsEditController);

    /** @ngInject */
      function CommissionsGoalsEditController(
        $mdDialog,
        $stateParams,
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
          var goal = $stateParams.id;
          roleService.getRoles().then(function(res) {
            vm.roles = res.data;
          });
          goalService.findById(goal).then(function(goal){
            vm.goal = goal;
          });
        }

        function sendForm(valid) {
          if (vm.isLoading || !valid) {
            return;
          }
          vm.isLoading = true;
          goalService
            .update(vm.goal).then(function(res){
              showConfirm();
              $scope.basicForm.$submitted = false;
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
