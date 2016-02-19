(function ()
{
    'use strict';

    angular
        .module('app.products.list')
        .controller('ProductsListController', ProductsListController);

    /** @ngInject */
    function ProductsListController(DTOptionsBuilder, DTColumnBuilder, api, $q)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'id', label:'ID'},
            {key:'ItemCode', label:'Code'},
            {key:'ItemName', label:'Name'},
            {key:'U_COLOR', label:'U_COLOR'},
            {key:'U_LINEA', label:'U_LINEA'},
            {key:'U_garantia', label:'U_garantia'},
            {key:'OnHand', label:'OnHand'},

        ];

        vm.actionUrl = {value:'/products/view/',col:1}

        vm.apiResource = api.product.find.get;

        // Methods

        //////////
    }

})();
