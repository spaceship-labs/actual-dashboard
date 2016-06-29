/*
(function ()
{
    'use strict';

    angular
        .module('app.products.categories.create')
        .controller('ProductBrandCreateController', ProductBrandCreateController);

*/

    /** @ngInject */
    function ProductBrandCreateController($scope, $rootScope, $mdDialog, dialogService,productService, commonService){
        $scope.init = init;
        $scope.create = create;
        $scope.cancel = cancel;

        $scope.isLoading = false;
        $scope.brand = {};

        $scope.init();

        //Methods

        function init(){
        }

        function cancel(){
          $mdDialog.cancel();
        }

        function create(form){
          if(form.$valid){
            $scope.isLoading = true;
            productService.createCustomBrand($scope.brand).then(function(res){
              console.log(res);
              $scope.isLoading = false;
              $rootScope.$emit('reloadTable', true);
              console.log(res);
              dialogService.showMessageDialog('Marca creada');
              $mdDialog.hide();
            });
          }
          else{
            dialogService.showMessageDialog('Campos incompletos');
            //dialogService.showDialog('Campos incompletos', '.form-dialog');
          }
        }

        $scope.$watch('brand.Name', function(newVal, oldVal){
          if(newVal != oldVal){
            $scope.brand.Handle = commonService.formatHandle(newVal);
          }
        });

    }

/*
})();
*/
