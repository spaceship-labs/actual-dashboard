(function ()
{
    'use strict';

    angular
        .module('app.commissions.create')
        .controller(
          'CommissionsCreateController',
          CommissionsCreateController
        );

      CommissionsCreateController.$inject = [
        '$scope',
        '$mdDialog',
        'dialogService',
        'userService',
        'roleService',
        'goalService',
        'storeService'
      ];
      function CommissionsCreateController(
        $scope,
        $mdDialog,
        dialogService,
        userService,
        roleService,
        goalService,
        storeService
      ){
        var vm             = this;
        vm.isLoading       = false;
        vm.goals           = [{}];
        vm.commissions     = undefined;
        vm.repeatedEntry   = repeatedEntry;
        vm.wasCreatedEntry = wasCreatedEntry;
        vm.getSellers      = getSellers;
        vm.selectDate      = selectDate;
        vm.sendForm        = sendForm;
        vm.addEntry        = addEntry;
        vm.removeEntry     = removeEntry;
        vm.showCommission  = showCommission;
        activate();

        function activate() {
          roleService.getRoles().then(function(res) {
            vm.roles = res.data;
          });
          storeService.getAllStores().then(function(stores) {
            vm.stores = stores;
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

        function repeatedEntry(entry, index) {
          return !!vm.goals.find(function(goal, i) {
            return index != i && goal.store == entry.store && equalDate(entry.date, goal.date);
          });
        }

        function wasCreatedEntry(entry) {
          return vm.error && !!vm.error.find(function(goal) {
            return goal.store == entry.store && equalDate(goal.date, entry.date);
          });
        }

        function anyGoalRepeated() {
          return !!vm.goals.find(function(goal, index) {
            return repeatedEntry(goal, index);
          });
        }

        function equalDate(d1, d2) {
          d1 = new Date(d1);
          d2 = new Date(d2);
          return d1.getTime() == d2.getTime();
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
          if (!valid || anyGoalRepeated() || vm.isLoading) {
            return;
          }
          goalService
            .create(vm.goals)
            .then(function(res){
              showConfirm();
              $scope
                .basicForm
                .$submitted = false;
              vm.goal       = {};
              vm.isLoading  = false;
            }).
            catch(function(res) {
              var err  = res.data;
              vm.error = err.entries;
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
