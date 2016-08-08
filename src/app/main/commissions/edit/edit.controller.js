(function ()
{
    'use strict';

    angular
        .module('app.commissions.edit')
        .controller(
          'CommissionsEditController',
          CommissionsEditController
        );

      function CommissionsEditController(
        $scope,
        $stateParams,
        $mdDialog,
        dialogService,
        userService,
        roleService,
        commissionService
      ){
        var vm            = this;
        vm.roles          = [];
        vm.isLoading      = false;
        vm.commission     = {};
        vm.sendForm       = sendForm;
        activate();

        function activate() {
          var commission = $stateParams.id;
          roleService.getRoles().then(function(res) {
            vm.roles = res.data;
          });
          commissionService.findById(commission).then(function(commission){
            vm.commission = commission;
          });
        }

        function sendForm(valid) {
          if (!valid || vm.isLoading) {
            return;
          }
          commissionService
            .update(vm.commission)
            .then(function(res){
              showConfirm();
              $scope
                .basicForm
                .$submitted = false;
              vm.isLoading  = false;
            }).
            catch(function(err) {
              showError();
              vm.isLoading = false;
            });
        }

        function showConfirm(){
          var alert = $mdDialog.alert({
            title: 'Comisión',
            textContent: 'Datos guardados exitosamente',
            ok: 'Close'
          });
          $mdDialog.show(alert);
        }

        function showError() {
           var alert = $mdDialog.alert({
            title: 'Comisión',
            textContent: 'Hubo un problema, reintente más tarde',
            ok: 'Close'
          });
          $mdDialog.show(alert);
        }


    }
})();
