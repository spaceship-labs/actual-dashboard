(function ()
{
    'use strict';

    angular
        .module('app.commissions.goals.list')
        .controller('CommissionsGoalsListController', CommissionsGoalsListController);

    /** @ngInject */
    function CommissionsGoalsListController(DTOptionsBuilder, DTColumnBuilder, api, $q)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'id', label:'ID'},
            {key:'name', label:'nombre'},
            {key:'role', label:'rol'},
            {key:'ammount', label:'cuota'},
        ];

        vm.apiResource = goalService.getList;

        // Methods

        //////////
    }

})();
