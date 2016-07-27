(function ()
{
    'use strict';

    angular
        .module('app.commissions.edit')
        .controller('CommissionsCreateController', CommissionsCreateController);

    /** @ngInject */
      function CommissionsCreateController(
        dialogService,
        userService,
        roleService,
        goalService
      ){
        var vm            = this;
        vm.roles          = [];
        vm.goals          = [];
        vm.isLoading      = false;
        vm.commission     = {
          goals: []
        };
        vm.toggleGoal     = toggleGoal;
        vm.isGoalSelected = isGoalSelected;
        vm.sendForm       = sendForm;
        activate();

        function activate() {
          roleService.getRoles().then(function(res) {
            vm.roles = res.data;
          });
          goalService.find().then(function(res){
            vm.goals = res.data;
          });
        }

        function toggleGoal(id) {
          if (isGoalSelected(id)) {
            vm.commission.goals = vm.commission.goals.find(function(goal){
              return goal != id;
            });
          } else  {
            vm.commission.goals =  vm.commission.goals.concat(id);
          }
        }

        function isGoalSelected(id) {
          return vm.commission.goals.indexOf(id) !== -1;
        }

        function sendForm(valid) {
          alert(valid);
          if (!valid || vm.isLoading) {
            return;
          }
          vm.isLoading = true;
        }

    }
})();
