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
            {key:'Name', label:'Name',actionUrl:'/products/categories/edit/', propId: 'id'},
            {key:'IsMain', label:'Principal', yesNo: true}
        ];

        vm.apiResource = productService.getCategories;

        // Methods
        //////////
    }

})();
