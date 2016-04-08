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
        vm.isLoading = false;
        vm.loadCategories = loadCategories;
        vm.groupSelectedCategories = groupSelectedCategories;

        vm.filter = {
          Values:[]
        };

        vm.init();

        //Methods

        function init(){
          vm.loadCategories();
        }

        function create(){
          vm.isLoading = true;
          vm.groupSelectedCategories();
          productService.createFilter(vm.filter).then(function(res){
            console.log(res);
            vm.isLoading = false;
            dialogService.showDialog('Filtro creado');
          });
        }

        function groupSelectedCategories(){
          vm.filter.Categories = [];
          for(var i=0;i<vm.categoriesGroups.length;i++){
            for(var j=0;j<vm.categoriesGroups[i].length;j++){
              if(vm.categoriesGroups[i][j].selected){
                vm.filter.Categories.push(vm.categoriesGroups[i][j].id);
              }
            }
          }
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            console.log(res);
            vm.categoriesGroups = res.data;
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
