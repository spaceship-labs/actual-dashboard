(function ()
{
    'use strict';

    angular
        .module('app.products.list')
        .controller('ProductsListController', ProductsListController);

    /** @ngInject */
    function ProductsListController(productService)
    {
        var vm = this;
        // Data
        vm.columns = [
            //{key:'id', label:'ID'},
            {key:'ItemCode', label:'Código', actionUrl:'/products/edit/', propId: 'ItemCode'},
            {key:'ItemName', label:'Nombre'},
            {key:'U_COLOR', label:'U_COLOR'},
            {key:'U_LINEA', label:'U_LINEA'},
            {key:'U_garantia', label:'U_garantia'},
            {key:'OnHand', label:'OnHand'},

        ];

        vm.apiResource = productService.getListNoImages;

        // Methods
        //////////
    }

})();
