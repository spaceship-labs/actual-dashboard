(function ()
{
    'use strict';

    angular
        .module('app.products.categories.edit')
        .controller('ProductCategoriesEditController', ProductCategoriesEditController);

    /** @ngInject */
    function ProductCategoriesEditController($scope ,$stateParams, dialogService,productService, commonService){
        var vm = this;

        vm.init = init;
        vm.update = update;
        vm.toggleCategory = toggleCategory;
        vm.loadCategories = loadCategories;
        vm.showDestroyDialog = showDestroyDialog;
        vm.formatCategoryGroups = formatCategoryGroups;

        vm.isLoading = false;
        vm.destroyFn = productService.destroyCategorybyId;

        //vm.category = {};

        vm.init();

        //Methods

        function init(){

          productService.getCategoryById($stateParams.id).then(function(res){
            console.log(res);
            vm.category = res.data;
            vm.loadCategories();
          });


        }

        function showDestroyDialog($ev){
          dialogService.showDestroyDialog($ev, vm.destroyFn, vm.category.id, '/products/categories');
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            console.log(res);
            vm.categoriesGroups = res.data;
            vm.formatCategoryGroups();
          });
        }

        function formatCategoryGroups(){
          for(var i=0;i<vm.categoriesGroups.length;i++){
            vm.categoriesGroups[i] = vm.categoriesGroups[i].filter(function(category){
              return category.id != vm.category.id;
            });

            vm.categoriesGroups[i] = vm.categoriesGroups[i].map(function(category){
              for(var j=0;j<vm.category.Parents.length;j++){
                if(vm.category.Parents[j].id === category.id){
                  category.selected = true;
                }
              }
              return category;
            });

          }
        }

        function update(form){
          if(form.$valid){
            vm.category.Parents = [];
            vm.isLoading = true;

            if(vm.category.IsMain){
              vm.category.CategoryLevel = 1;
              vm.category.Parents = [];
            }

            for(var i=0;i<vm.categoriesGroups.length;i++){
              for(var j=0;j<vm.categoriesGroups[i].length;j++){
                if(vm.categoriesGroups[i][j].selected){
                  vm.category.Parents.push(vm.categoriesGroups[i][j].id);
                }
              }
            }

            productService.updateCategory(vm.category.id,vm.category).then(function(res){
              console.log(res);
              vm.isLoading = false;
              dialogService.showDialog('Categoria actualizada');
            });
          }
          else{
            dialogService.showDialog('Campos incompletos');
          }

        }

        function toggleCategory(item, list){
          var idx = list.indexOf(item);
          if (idx > -1) {
            list.splice(idx, 1);
          }
          else {
            list.push(item);
          }
        }

        $scope.$watch('vm.category.Name', function(newVal, oldVal){
          if(newVal != oldVal && newVal!= ''){
            vm.category.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
            vm.category.Handle = commonService.formatHandle(vm.category.Handle);
          }
        });

    }
})();
