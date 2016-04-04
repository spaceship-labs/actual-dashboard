(function ()
{
    'use strict';

    angular
        .module('app.products.categories.list')
        .controller('ProductsCategoriesListController', ProductsCategoriesListController);

    /** @ngInject */
    function ProductsCategoriesListController(productService)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'Name', label:'Name'}
        ];

        vm.apiResource = productService.getCategories;

        // Methods
        //////////
    }

})();
