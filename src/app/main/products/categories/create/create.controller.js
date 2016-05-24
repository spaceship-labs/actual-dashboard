/*
(function ()
{
    'use strict';

    angular
        .module('app.products.categories.create')
        .controller('ProductCategoriesCreateController', ProductCategoriesCreateController);

*/

    /** @ngInject */
    function ProductCategoriesCreateController($scope, $rootScope, $mdDialog, dialogService,productService, commonService){
        $scope.init = init;
        $scope.create = create;
        $scope.toggleCategoryMain = toggleCategoryMain;
        $scope.setSelectedCategories = setSelectedCategories;
        $scope.cancel = cancel;

        $scope.isLoading = false;

        $scope.category = {
          IsMain: true,
        };
        $scope.categoriesGroups = [];

        $scope.init();

        //Methods

        function init(){
          productService.getCategoriesGroups().then(function(res){
            $scope.categoriesGroups = res.data;
            $scope.selectedCategories = [];
            console.log($scope.categoriesGroups.length);
            /*
            for(var i=0;$scope.categoriesGroups.length; i++){
              $scope.selectedCategories[i] = [];
            }
            */
          });
        }

        function cancel(){
          $mdDialog.cancel();
        }

        function create(form){
          if(form.$valid){
            $scope.isLoading = true;
            if($scope.category.IsMain){
              $scope.category.CategoryLevel = 1;
            }

            $scope.setSelectedCategories();
            productService.createCategory($scope.category).then(function(res){
              console.log(res);
              $scope.isLoading = false;
              $rootScope.$emit('reloadTable', true);
              dialogService.showMessageDialog('Categoria creada');
              $mdDialog.hide();
              //dialogService.showDialog('Categoria creada', '.form-dialog');
            });
          }
          else{
            dialogService.showMessageDialog('Campos incompletos');
            //dialogService.showDialog('Campos incompletos', '.form-dialog');
          }
        }

        function setSelectedCategories(){
          $scope.category.Parents = [];
          if(!$scope.category.IsMain){
            for(var i=0;i<$scope.selectedCategories.length;i++){
              for(var j=0;j<$scope.selectedCategories[i].length;j++){
                $scope.category.Parents.push($scope.selectedCategories[i][j]);
              }
            }
          }
        }

        function toggleCategoryMain(){
          //If category was main
          if($scope.category.IsMain){
            $scope.category.CategoryLevel = 2;
          }
        }

        $scope.$watch('category.Name', function(newVal, oldVal){
          if(newVal != oldVal && newVal != ''){
            $scope.category.Handle = newVal.replace(/\s+/g, '-').toLowerCase();
            $scope.category.Handle = commonService.formatHandle($scope.category.Handle);
          }
        });

        $scope.$watch('category.IsMain', function(newVal, oldVal){
          if(newVal != oldVal){
            if(newVal === true){
              $scope.category.CategoryLevel = 1;
            }
          }
        });

    }

/*
})();
*/
