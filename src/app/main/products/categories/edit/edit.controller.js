(function ()
{
    'use strict';

    angular
        .module('app.products.categories.edit')
        .controller('ProductCategoriesEditController', ProductCategoriesEditController);

    /** @ngInject */
    function ProductCategoriesEditController($scope ,$stateParams, dialogService,productService){
        var vm = this;

        vm.init = init;
        vm.create = create;
        vm.toggleCategory = toggleCategory;
        vm.loadCategories = loadCategories;

        vm.isLoading = false;

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

        function loadCategories(){
          productService.getAllCategories().then(function(res){
            vm.categories = res.data;
            for(var i=0;i<vm.categories.length; i++){

              for(var j=0;j<vm.category.Parents.length;j++){
                console.log('comparando: parent: ' + vm.category.Parents[j].Name + ' con category : ' + vm.categories[i].Name);
                if( vm.categories[i].id === vm.category.Parents[j].id ){
                  vm.categories[i].selected = true;
                }
              }

              //Removing from list if is the same category
              if(vm.categories[i].id == vm.category.id){
                vm.categories.splice(i,1);
              }

            }
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
