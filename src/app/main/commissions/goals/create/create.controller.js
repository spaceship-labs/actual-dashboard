(function ()
{
    'use strict';

    angular
        .module('app.commissions.goals.edit')
        .controller('CommissionsGoalsCreateController', CommissionsGoalsCreateController);

    /** @ngInject */
    function CommissionsGoalsCreateController(dialogService, userService){
        var vm = this;

        vm.roles = [
          {name:'Vendedor', id:2, handle:'seller'},
          {name:'Broker', id:3, handle:'broker'},
          {name:'Gerente', id:7, handle:'manager'}
        ];
    }
})();
