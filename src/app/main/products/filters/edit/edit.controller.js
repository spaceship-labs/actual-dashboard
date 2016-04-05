(function ()
{
    'use strict';

    angular
        .module('app.products.filters.create')
        .controller('ProductFiltersEditController', ProductFiltersEditController);

    /** @ngInject */
    function ProductFiltersEditController($scope, $stateParams ,productService, dialogService, commonService){
        var vm = this;
        vm.init = init;
        vm.newFilterValue = newFilterValue;
        vm.update = update;

        vm.init();

        //Methods

        function init(){
          productService.getFilterById($stateParams.id).then(function(res){
            console.log(res);
            vm.filter = res.data;
          });
        }

        function update(){
          productService.updateFilterById(vm.filter.id, vm.filter).then(function(res){
            console.log(res);
            dialogService.showDialog('Filtro actualizado');
          });
        }

        function newFilterValue(chip) {
          return {
            Name: chip
          };
        };


        $scope.$watch('vm.filter.Name', function(newVal, oldVal){
          if(newVal != oldVal){

            vm.filter.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
            vm.filter.Handle = commonService.formatHandle(vm.filter.Handle);
          }
        });

    }
})();
