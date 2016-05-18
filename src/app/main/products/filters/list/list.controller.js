(function ()
{
    'use strict';

    angular
        .module('app.products.filters.list')
        .controller('ProductsFiltersListController', ProductsFiltersListController);

    /** @ngInject */
    function ProductsFiltersListController(productService, $rootScope)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/products/filters/edit/', propId: 'id'},
            {key:'Name', label:'Nombre',actionUrl:'/products/filters/edit/', propId: 'id'},
            {key:'IsMultiple', label:'Acepta valores multiples', yesNo: true},
            {key:'Delete',label:'Eliminar',destroy:true}
        ];

        vm.apiResource = productService.getFilters;
        vm.destroyFn =  productService.destroyFilterById;

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
