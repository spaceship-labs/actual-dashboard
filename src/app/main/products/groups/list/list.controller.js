(function ()
{
    'use strict';

    angular
        .module('app.products.groups.list')
        .controller('ProductsGroupsListController', ProductsGroupsListController);

    /** @ngInject */
    function ProductsGroupsListController(productService, $rootScope)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/products/groups/edit/', propId: 'id'},
            {key:'Name', label:'Nombre',actionUrl:'/products/groups/edit/', propId: 'id'},
            {
              key:'Type',
              label:'Tipo de agrupador',
              mapper:{
                'variations':'Variaciones',
                'environments': 'Ambientes',
                'packages':'Paquetes',
                'relations':'Relacionados'
              }
            },
            {key:'Delete',label:'Eliminar',destroy:true}
        ];

        vm.apiResource = productService.getGroups;
        vm.destroyFn =  productService.destroyGroup;

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
