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
            {key:'CategoryLevel', label:'Nivel'},
            {key:'IsMain', label:'Principal', yesNo: true},
            {key:'Delete',label:'Eliminar',destroy:true}
        ];

        vm.apiResource = productService.getCategories;
        vm.destroyFn =  productService.destroyCategorybyId;

        // Methods
        //////////
    }

})();
