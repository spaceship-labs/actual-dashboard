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
            {key:'Edit', label:'Editar', editUrl:'/products/edit/', propId: 'ItemCode'},
            {key:'ItemCode', label:'Código', actionUrl:'/products/edit/', propId: 'ItemCode'},
            {key:'ItemName', label:'Nombre'},
            {key:'OnHand', label:'OnHand'},

        ];

        vm.apiResource = productService.getListNoImages;

        // Methods
        //////////
    }

})();
