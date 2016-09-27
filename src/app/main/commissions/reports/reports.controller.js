(function ()
{
    'use strict';

    angular
        .module('app.commissions.reports')
        .controller('CommissionsReportsController', CommissionsReportsController);

    /** @ngInject */
      function CommissionsReportsController(
        DTOptionsBuilder,
        DTColumnBuilder,
        api,
        $q,
        goalService
      ){
        var vm = this;
        // Data
        vm.columns = [
            {key: 'Edit', label:'Editar', editUrl:'/commissions/edit/', propId: 'id'},
            {key: 'store.name', label: 'Tienda'},
            {key: 'date', label: 'Fecha', dateMonth: true},
            {key: 'goal', label: 'Meta', currency: true},
        ];

        vm.apiResource = goalService.getList;

        // Methods

        //////////
    }

})();
