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
        commissionService,
        companyService
      ){
        var vm        = this;
        vm.isLoading  = false;
        vm.companies  = [];
        vm.commission = {};
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
            vm.commission.sellers = sellers;
          });
        }

        function selectDate(date) {
          vm.commission.date = date._d;
        }

        function sendForm(valid) {
          if (!valid || vm.isLoading) {
            return;
          }
          var commission = Object.assign({},vm.commission, {
              individualRate: vm.commission.individualRate / 100,
              storeRate: vm.commission.storeRate / 100
            });
          commissionService
            .create(commission)
            .then(function(res){
              showConfirm();
              $scope
                .basicForm
                .$submitted = false;
              vm.commission = {};
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
