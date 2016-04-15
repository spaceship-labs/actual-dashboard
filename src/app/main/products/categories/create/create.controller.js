(function ()
{
    'use strict';

    angular
        .module('app.products.categories.create')
        .controller('ProductCategoriesCreateController', ProductCategoriesCreateController);

    /** @ngInject */
    function ProductCategoriesCreateController($scope ,$stateParams, dialogService,productService, commonService){
        var vm = this;

        vm.init = init;
        vm.create = create;
        vm.toggleCategoryMain = toggleCategoryMain;
        vm.setSelectedCategories = setSelectedCategories;

        vm.isLoading = false;

        vm.category = {
          IsMain: true,
        };
        vm.categoriesGroups = [];

        vm.init();

        //Methods

        function init(){
          productService.getCategoriesGroups().then(function(res){
            vm.categoriesGroups = res.data;
          });
        }

        function create(form){
          if(form.$valid){
            vm.isLoading = true;
            if(vm.category.IsMain){
              vm.category.CategoryLevel = 1;
            }

            vm.setSelectedCategories();
            productService.createCategory(vm.category).then(function(res){
              console.log(res);
              vm.isLoading = false;
              dialogService.showDialog('Categoria creada');
            });
          }
          else{
            dialogService.showDialog('Campos incompletos');
          }
        }

        function setSelectedCategories(){
          vm.category.Parents = [];
          if(!vm.category.IsMain){
            for(var i=0;i<vm.categoriesGroups.length;i++){
              for(var j=0;j<vm.categoriesGroups[i].length;j++){
                if(vm.categoriesGroups[i][j].selected){
                  vm.category.Parents.push(vm.categoriesGroups[i][j].id);
                }
              }
            }
          }
        }

        function toggleCategoryMain(){
          //If category was main
          if(vm.category.IsMain){
            vm.category.CategoryLevel = 2;
          }
        }

        $scope.$watch('vm.category.Name', function(newVal, oldVal){
          if(newVal != oldVal && newVal != ''){
            vm.category.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
            vm.category.Handle = commonService.formatHandle(vm.category.Handle);
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
