(function ()
{
    'use strict';

    angular
        .module('app.products.filters.create')
        .controller('ProductFiltersCreateController', ProductFiltersCreateController);

    /** @ngInject */
    function ProductFiltersCreateController($scope ,productService, dialogService, commonService){
        var vm = this;
        vm.init = init;
        vm.create = create;

        vm.filter = {
          Values:[]
        };

        vm.init();

        //Methods

        function init(){
        }

        function create(){
          productService.createFilter(vm.filter).then(function(res){
            console.log(res);
            dialogService.showDialog('Filtro creado');
          });
        }

        $scope.$watch('vm.filter.Name', function(newVal, oldVal){
          if(newVal != oldVal){

            vm.filter.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
            vm.filter.Handle = commonService.formatHandle(vm.filter.Handle);
          }
        });

    }
})();
