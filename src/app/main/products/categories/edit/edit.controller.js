/*
(function ()
{
    'use strict';

    angular
        .module('app.products.categories.edit')
        .controller('ProductCategoriesEditController', ProductCategoriesEditController);
*/

    /** @ngInject */
    function ProductCategoriesEditController($scope, $rootScope ,$stateParams, $mdDialog, dialogService,productService, commonService, params){
        //var $scope = this;

        $scope.init = init;
        $scope.update = update;
        $scope.toggleCategory = toggleCategory;
        $scope.loadCategories = loadCategories;
        $scope.showDestroyDialog = showDestroyDialog;
        $scope.formatCategoryGroups = formatCategoryGroups;
        $scope.cancel = cancel;

        $scope.isLoading = false;

        $scope.destroyFn = productService.destroyCategorybyId;

        //$scope.category = {};

        $scope.init();

        //Methods
        function cancel(){
          $mdDialog.cancel();
        }


        function init(){
          productService.getCategoryById(params.id).then(function(res){
            console.log(res);
            $scope.category = res.data;
            $scope.loadCategories();
          });


        }

        function showDestroyDialog($ev){
          dialogService.showDestroyDialog($ev, $scope.destroyFn, $scope.category.id, '/products/categories');
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            console.log(res);
            $scope.categoriesGroups = res.data;
            $scope.formatCategoryGroups();
          });
        }

        function formatCategoryGroups(){
          for(var i=0;i<$scope.categoriesGroups.length;i++){
            $scope.categoriesGroups[i] = $scope.categoriesGroups[i].filter(function(category){
              return category.id != $scope.category.id;
            });

            $scope.categoriesGroups[i] = $scope.categoriesGroups[i].map(function(category){
              for(var j=0;j<$scope.category.Parents.length;j++){
                if($scope.category.Parents[j].id === category.id){
                  category.selected = true;
                }
              }
              return category;
            });

          }
        }

        function update(form){
          if(form.$valid){
            $scope.category.Parents = [];
            $scope.isLoading = true;

            if($scope.category.IsMain){
              $scope.category.CategoryLevel = 1;
              $scope.category.Parents = [];
            }

            for(var i=0;i<$scope.categoriesGroups.length;i++){
              for(var j=0;j<$scope.categoriesGroups[i].length;j++){
                if($scope.categoriesGroups[i][j].selected){
                  $scope.category.Parents.push($scope.categoriesGroups[i][j].id);
                }
              }
            }

            productService.updateCategory($scope.category.id,$scope.category).then(function(res){
              console.log(res);
              $scope.isLoading = false;
              $rootScope.$emit('reloadTable', true);
              dialogService.showMessageDialog('Categoria actualizada');
              $mdDialog.hide();
              //dialogService.showDialog('Categoria actualizada');
            });
          }
          else{
            dialogService.showMessageDialog('Campos incompletos');
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

        /*
        $scope.$watch('$scope.category.Name', function(newVal, oldVal){
          if(newVal != oldVal && newVal!= ''){
            $scope.category.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
            $scope.category.Handle = commonService.formatHandle($scope.category.Handle);
          }
        });
        */

    }
/*
})();
*/
