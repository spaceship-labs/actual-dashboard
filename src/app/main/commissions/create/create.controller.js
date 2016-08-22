(function ()
{
    'use strict';

    angular
        .module('app.commissions.edit')
        .controller(
          'CommissionsCreateController',
          CommissionsCreateController
        );

      function CommissionsCreateController(
        $scope,
        $mdDialog,
        dialogService,
        userService,
        roleService,
        goalService,
        companyService
      ){
        var vm        = this;
        vm.isLoading  = false;
        vm.goal       = {};
        vm.getSellers = getSellers;
        vm.selectDate = selectDate;
        vm.sendForm   = sendForm;
        activate();

        function activate() {
          roleService.getRoles().then(function(res) {
            vm.roles = res.data;
          });
          companyService.getAllCompanies().then(function(companies) {
            vm.companies = companies;
          });
        }

        function getSellers(company) {
          companyService.countSellers(company).then(function(sellers) {
            vm.goal.sellers = sellers;
          });
        }

        function selectDate(date) {
          var date = new Date(date._d);
          var y    = date.getFullYear();
          var m    = date.getMonth();
          vm.goal.date = new Date(y, m, 1);
        }

        function sendForm(valid) {
          if (!valid || vm.isLoading) {
            return;
          }
          goalService
            .create(vm.goal)
            .then(function(res){
              showConfirm();
              $scope
                .basicForm
                .$submitted = false;
              vm.goal       = {};
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
