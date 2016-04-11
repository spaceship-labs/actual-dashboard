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
        vm.loadCategories = loadCategories;
        vm.formatCategoryGroups = formatCategoryGroups;
        vm.groupSelectedCategories = groupSelectedCategories;
        vm.isLoading = false;

        vm.init();

        //Methods

        function init(){
          productService.getFilterById($stateParams.id).then(function(res){
            console.log(res);
            vm.filter = res.data;
            vm.loadCategories();
          });
        }

        function update(form){
          if(form.$valid && vm.filter.Values.length > 0){
            vm.isLoading = true;
            vm.groupSelectedCategories();
            productService.updateFilterById(vm.filter.id, vm.filter).then(function(res){
              console.log(res);
              vm.isLoading = false;
              dialogService.showDialog('Filtro actualizado');
            });
          }
          else{
            dialogService.showDialog('Campos incompletos');
          }
        }

        function newFilterValue(chip) {
          return {
            Name: chip,
            Handle: commonService.formatHandle(chip)
          };
        }

        function groupSelectedCategories(){
          vm.filter.Categories = [];
          for(var i=0;i<vm.categoriesGroups.length;i++){
            for(var j=0;j<vm.categoriesGroups[i].length;j++){
              if(vm.categoriesGroups[i][j].selected){
                vm.filter.Categories.push(vm.categoriesGroups[i][j]);
              }
            }
          }
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            vm.categoriesGroups = res.data;
            vm.formatCategoryGroups();
          });
        }

        function formatCategoryGroups(){
          for(var i=0;i<vm.categoriesGroups.length;i++){
            for(var j=0;j<vm.filter.Categories.length;j++){
              vm.categoriesGroups[i] = vm.categoriesGroups[i].map(function(category){
                if(vm.filter.Categories[j].id == category.id){
                  category.selected = true;
                }
                return category;
              });
            }
          }
        }


        $scope.$watch('vm.filter.Name', function(newVal, oldVal){
          if(newVal != oldVal && newVal != ''){
            vm.filter.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
            vm.filter.Handle = commonService.formatHandle(vm.filter.Handle);
          }
        });

    }
})();
