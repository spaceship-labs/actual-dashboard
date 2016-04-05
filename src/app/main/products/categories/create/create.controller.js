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
        vm.toggleCategory = toggleCategory;

        vm.isLoading = false;

        vm.category = {};

        vm.init();

        //Methods

        function init(){
          /*
          productService.getById($stateParams.id).then(function(res){
            vm.product = res.data.data;
          });
          */
          productService.getAllCategories().then(function(res){
            console.log(res);
            vm.categories = res.data;
          });
        }

        function create(){
          vm.isLoading = true;
          if(vm.category.IsMain){
            vm.category.CategoryLevel = 1;
          }

          vm.category.parents = [];
          for(var i=0; i<vm.categories.length;i++){
            if(vm.categories[i].selected){
              vm.category.parents.push(vm.categories[i].id);
            }
          }

          console.log(vm.category);

          productService.createCategory(vm.category).then(function(res){
            console.log(res);
            vm.isLoading = false;
            dialogService.showDialog('Categoria creada');
          });

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
          if(newVal != oldVal){
            vm.category.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
          }
        });

    }
})();
