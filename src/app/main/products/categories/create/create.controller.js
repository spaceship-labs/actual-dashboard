(function ()
{
    'use strict';

    angular
        .module('app.products.categories.create')
        .controller('ProductCategoriesCreateController', ProductCategoriesCreateController);

    /** @ngInject */
    function ProductCategoriesCreateController($scope ,$stateParams, dialogService,productService){
        var vm = this;

        vm.init = init;
        vm.create = create;
        vm.toggleCategoryMain = toggleCategoryMain;

        vm.isLoading = false;

        vm.category = {
          IsMain: true,
        };
        vm.categoriesGroups = [];

        vm.init();

        //Methods

        function init(){
          /*
          productService.getById($stateParams.id).then(function(res){
            vm.product = res.data.data;
          });
          */
          productService.getCategoriesGroups().then(function(res){
            console.log(res);
            vm.categoriesGroups = res.data;
          });

        }

        function create(){
          vm.isLoading = true;
          if(vm.category.IsMain){
            vm.category.CategoryLevel = 1;
          }

          vm.category.parents = [];
          for(var i=0;i<vm.categoriesGroups.length;i++){
            for(var j=0;j<vm.categoriesGroups[i].length;j++){
              if(vm.categoriesGroups[i][j].selected){
                //delete vm.categoriesGroups[i][j].selected;
                vm.category.parents.push(vm.categoriesGroups[i][j].id);
              }
            }
          }


          console.log(vm.category);

          productService.createCategory(vm.category).then(function(res){
            console.log(res);
            vm.isLoading = false;
            dialogService.showDialog('Categoria creada');
          });

        }

        function toggleCategoryMain(){
          //If category was main
          if(vm.category.IsMain){
            vm.category.CategoryLevel = 2;
          }
        }

        $scope.$watch('vm.category.Name', function(newVal, oldVal){
          if(newVal != oldVal){
            vm.category.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
          }
        });

        $scope.$watch('vm.category.IsMain', function(newVal, oldVal){
          if(newVal != oldVal){
            if(newVal === true){
              vm.category.CategoryLevel = 1;
            }
          }
        });

    }
})();
