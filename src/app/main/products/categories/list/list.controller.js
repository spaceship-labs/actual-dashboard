(function ()
{
    'use strict';

    angular
        .module('app.products.categories.list')
        .controller('ProductsCategoriesListController', ProductsCategoriesListController);

    /** @ngInject */
    function ProductsCategoriesListController(productService, $rootScope)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'Name', label:'Nombre',actionUrl:'/products/categories/edit/', propId: 'id'},
            {key:'CategoryLevel', label:'Nivel'},
            {key:'IsMain', label:'Principal', yesNo: true},
            {key:'Delete',label:'Eliminar',destroy:true}
        ];

        vm.apiResource = productService.getCategories;
        vm.destroyFn =  productService.destroyCategorybyId;

        $rootScope.$on('destroyingItemStart', function(ev, start){
          if(start){
            vm.isLoadingDelete = true;
          }
        });

        $rootScope.$on('destroyingItemEnd', function(ev, end){
          if(end){
            vm.isLoadingDelete = false;
          }
        });

        // Methods
        //////////
    }

})();
