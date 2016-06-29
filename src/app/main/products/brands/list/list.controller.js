(function ()
{
    'use strict';

    angular
        .module('app.products.brands.list')
        .controller('ProductsBrandListController', ProductsBrandListController);

    /** @ngInject */
    function ProductsBrandListController($scope,productService, $rootScope, $mdMedia,  $mdDialog)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/products/brands/edit/', propId: 'id'},
            {key: 'id', label:'ID'},
            {key:'Name', label:'Nombre',actionUrl:'/products/brands/edit/', propId: 'id'},
            {key:'Handle', label:'URL'},
            {key:'Delete',label:'Eliminar',destroy:true}
        ];

        vm.apiResource = productService.findCustomBrands;
        vm.destroyFn =  productService.destroyCustomBrand;

        $rootScope.$on('destroyingItemStart', function(ev, start){
          if(start){
            vm.isLoadingDelete = true;
          }
        });

        $rootScope.$on('destroyingItemEnd', function(ev, end){
          if(end){
            vm.isLoadingDelete = false;
          }
        });

        // Methods
        vm.openValueForm =  function(ev, id) {
          console.log('edit brand');
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: ProductBrandEditController,
            templateUrl: 'app/main/products/brands/edit/edit.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            locals: {
              params: {id: id}
            }
          })
          .then(function(newData) {
            console.log('oK');
          }, function() {
            console.log('not oK')
          });
        };

        vm.createForm =  function(ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: ProductBrandCreateController,
            templateUrl: 'app/main/products/brands/create/create.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
          })
          .then(function(newData) {
            console.log('oK');
          }, function() {
            console.log('not oK')
          });
        };
        //////////
    }

})();
