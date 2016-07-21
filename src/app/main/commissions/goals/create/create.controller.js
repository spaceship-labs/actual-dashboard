(function ()
{
    'use strict';

    angular
        .module('app.commissions.goals.edit')
        .controller('CommissionsGoalsCreateController', CommissionsGoalsCreateController);

    /** @ngInject */
    function CommissionsGoalsCreateController(dialogService, userService, roleService, goalService){
        var vm         = this;
        vm.roles       = [];
        vm.sendingForm = false;
        vm.sendForm    = sendForm;

        activate();

        function activate() {
          roleService.getRoles().then(function(res) {
            vm.roles = res.data;
          });
        }

        function sendForm() {
          if (vm.sendingForm) {
            return;
          }
          vm.sendingForm = true;
          goalService.create(vm.goal).then(function(res){
            vm.sendingForm = false;
          });
        }
    }
})();
