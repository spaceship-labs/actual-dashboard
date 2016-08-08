(function ()
{
    'use strict';

    angular
        .module('app.commissions.list')
        .controller('CommissionsListController', CommissionsListController);

    /** @ngInject */
      function CommissionsListController(
        DTOptionsBuilder,
        DTColumnBuilder,
        api,
        $q,
        commissionService
      ){
        var vm = this;
        // Data
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/commissions/edit/', propId: 'id'},
            {key: 'name', label: 'Nombre'},
            {key: 'individualGoal', label: 'Meta individual', currency: true},
            {key: 'storeGoal', label: 'Meta de la tienda', currency: true},
            {key: 'individualRate', label: 'Comisión individual', rate: true, isRateNormalized: true},
            {key: 'storeRate', label: 'Comisión de la tienda', rate: true, isRateNormalized: true},
            {key: 'type.name', label: 'Tipo de usuario'}
        ];

        vm.apiResource = commissionService.getList;

        // Methods

        //////////
    }

})();
