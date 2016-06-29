/*
(function ()
{
    'use strict';

    angular
        .module('app.products.categories.edit')
        .controller('ProductBrandEditController', ProductBrandEditController);
*/

    /** @ngInject */
    function ProductBrandEditController($scope, $rootScope ,$stateParams, $mdDialog, dialogService,productService, commonService, params){
        //var $scope = this;

        $scope.init = init;
        $scope.update = update;
        $scope.showDestroyDialog = showDestroyDialog;
        $scope.cancel = cancel;

        $scope.isLoading = false;

        //$scope.category = {};

        $scope.init();

        //Methods
        function cancel(){
          $mdDialog.cancel();
        }


        function init(){
          productService.getCustomBrandById(params.id).then(function(res){
            $scope.brand = res.data;
          });


        }

        function showDestroyDialog($ev){
          dialogService.showDestroyDialog($ev, $scope.destroyFn, $scope.brand.id, '/products/brands');
        }



        function update(form){
          if(form.$valid){
            $scope.isLoading = true;

            productService.updateCustomBrand($scope.brand.id,$scope.brand).then(function(res){
              console.log(res);
              $scope.isLoading = false;
              $rootScope.$emit('reloadTable', true);
              dialogService.showMessageDialog('Marca actualizada');
              $mdDialog.hide();
            });
          }
          else{
            dialogService.showMessageDialog('Campos incompletos');
          }

        }


    }
/*
})();
*/
