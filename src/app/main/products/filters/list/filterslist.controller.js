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
            {key:'Name', label:'Name'}
        ];

        vm.apiResource = productService.getFilters;

        // Methods
        //////////
    }

})();
