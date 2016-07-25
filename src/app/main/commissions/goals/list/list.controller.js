(function ()
{
    'use strict';

    angular
        .module('app.commissions.goals.list')
        .controller('CommissionsGoalsListController', CommissionsGoalsListController);

    /** @ngInject */
      function CommissionsGoalsListController(
        $q,
        DTOptionsBuilder,
        DTColumnBuilder,
        api,
        goalService
      ){
        var vm = this;
        // Data
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/commissions/goals/edit/', propId: 'id'},
            {key:'name', label:'nombre'},
            {key:'role.name', label:'rol'},
            {key:'ammount', label:'cuota', currency: true},
        ];

        vm.apiResource = goalService.getList;

        // Methods

        //////////
    }

})();
