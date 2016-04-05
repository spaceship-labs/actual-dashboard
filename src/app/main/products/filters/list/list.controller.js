(function ()
{
    'use strict';

    angular
        .module('app.products.filters.list')
        .controller('ProductsFiltersListController', ProductsFiltersListController);

    /** @ngInject */
    function ProductsFiltersListController(productService)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'Name', label:'Nombre',actionUrl:'/products/filters/edit/', propId: 'id'},
            {key:'IsMultiple', label:'Acepta valores multiples', yesNo: true},
            {key:'Delete',label:'Eliminar',destroy:true}
        ];

        vm.apiResource = productService.getFilters;
        vm.destroyFn =  productService.destroyFilterById;

        // Methods
        //////////
    }

})();
