(function ()
{
    'use strict';

    angular
        .module('app.commissions.edit')
        .controller(
          'CommissionsEditController',
          CommissionsEditController
        );

      CommissionsEditController.$inject = [
        '$scope',
        '$mdDialog',
        '$stateParams',
        'dialogService',
        'userService',
        'roleService',
        'goalService',
        'storeService'
      ];
      function CommissionsEditController(
        $scope,
        $mdDialog,
        $stateParams,
        dialogService,
        userService,
        roleService,
        goalService,
        storeService
      ){
        var vm            = this;
        vm.isLoading      = false;
        vm.goals          = [];
        vm.commissions    = undefined;
        vm.getSellers     = getSellers;
        vm.selectDate     = selectDate;
        vm.sendForm       = sendForm;
        vm.addEntry       = addEntry;
        vm.removeEntry    = removeEntry;
        vm.showCommission = showCommission;
        activate();

        function activate() {
          var goal = $stateParams.id;
          roleService.getRoles().then(function(res) {
            vm.roles = res.data;
          });
          storeService.getAllStores().then(function(stores) {
            vm.stores = stores;
          });
          goalService.findById(goal).then(function(goal){
            var date = new Date(goal.date);
            var d    = date.getDate();
            var y    = date.getFullYear();
            var m    = date.getMonth() + 1;
            vm._date  = [m, y].join('-');
            vm.goals = vm.goals.concat(goal);
          });
        }

        function getSellers(index, store) {
          storeService.countSellers(store).then(function(sellers) {
            vm.goals[index].sellers = sellers;
          });
        }

        function selectDate(index, date) {
          var date = new Date(date._d);
          var y    = date.getFullYear();
          var m    = date.getMonth();
          vm.goals[index].date = new Date(y, m, 1);
        }

        function addEntry() {
          vm.goals = vm.goals.concat({});
        }

        function removeEntry(index) {
          vm.goals = vm.goals.filter(function(entry, _index) {
            return _index != index;
          });
        }

        function showCommission(goal) {
          var table = {
            parent: angular.element(document.body),
            templateUrl: 'app/main/commissions/create/dialogTable.html',
            controller: [
              '$scope',
              '$mdDialog',
              function($scope, $mdDialog) {
                $scope.goal = goal;
              }
            ],
            clickOutsideToClose: true
          };
          $mdDialog.show(table);
        }

        function sendForm(valid) {
          if (!valid || vm.isLoading) {
            return;
          }
          goalService
            .update(vm.goals[0])
            .then(function(res){
              showConfirm();
              $scope
                .basicForm
                .$submitted = false;
              vm.goal       = {};
              vm.isLoading  = false;
            }).
            catch(function(res) {
              var err = res.data;
              showError(err.originalError);
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

        function showError(err) {
           var alert = $mdDialog.alert({
            title: 'Comisión',
            textContent: err || 'Hubo un problema, reintente más tarde',
            ok: 'Close'
          });
          $mdDialog.show(alert);
        }
    }
})();

/*
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
        $mdDialog,
        dialogService,
        userService,
        roleService,
        goalService,
        companyService
      ){
        var vm            = this;
        vm.isLoading      = false;
        vm.goals          = [];
        vm.commissions    = undefined;
        vm.getSellers     = getSellers;
        vm.selectDate     = selectDate;
        vm.sendForm       = sendForm;
        vm.addEntry       = addEntry;
        vm.removeEntry    = removeEntry;
        vm.showCommission = showCommission;
        activate();

        function activate() {
          var goal = $stateParams.id;
          roleService.getRoles().then(function(res) {
            vm.roles = res.data;
          });
          companyService.getAllCompanies().then(function(companies) {
            vm.companies = companies;
          });
          goalService.findById(goal).then(function(goal){
            var date = new Date(goal.date);
            var d    = date.getDate();
            var y    = date.getFullYear();
            var m    = date.getMonth() + 1;
            vm.date  = [m, y].join('-');
            vm.goals = vm.goals.concat(goal);
          });

        }

        function getSellers(index, company) {
          companyService.countSellersGeneral(company).then(function(sellers) {
            vm.goals[index].sellers = sellers;
          });
          companyService.countSellersProject(company).then(function(sellers) {
            vm.goals[index].sellersProject = sellers;
          });
        }

        function selectDate(index, date) {
          var date = new Date(date._d);
          var y    = date.getFullYear();
          var m    = date.getMonth();
          vm.goals[index].date = new Date(y, m, 1);
        }

        function addEntry() {
          vm.goals = vm.goals.concat({});
        }

        function removeEntry(index) {
          vm.goals = vm.goals.filter(function(entry, _index) {
            return _index != index;
          });
        }

        function showCommission(goal) {
          var table = {
            parent: angular.element(document.body),
            templateUrl: 'app/main/commissions/create/dialogTable.html',
            controller: function($scope) {
              $scope.goal = goal;
            },
            clickOutsideToClose: true
          };
          $mdDialog.show(table);
        }

        function sendForm(valid) {
          if (!valid || vm.isLoading) {
            return;
          }
          goalService
            .update(vm.goals[0])
            .then(function(res){
              showConfirm();
              $scope
                .basicForm
                .$submitted = false;
              vm.isLoading  = false;
            }).
            catch(function(res) {
              var err = res.data;
              showError(err.originalError);
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

        function showError(err) {
           var alert = $mdDialog.alert({
            title: 'Comisión',
            textContent: err || 'Hubo un problema, reintente más tarde',
            ok: 'Close'
          });
          $mdDialog.show(alert);
        }

    }
})();
*/
