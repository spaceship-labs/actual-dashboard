(function ()
{
    'use strict';

    angular
        .module('app.products.categories.list')
        .controller('ProductsCategoriesListController', ProductsCategoriesListController);

    /** @ngInject */
    function ProductsCategoriesListController($scope,productService, $rootScope, $mdMedia,  $mdDialog)
    {
        var vm = this;
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/products/categories/edit/', propId: 'id'},
          /*{key: 'id', label:'ID'},*/
            {key:'Name', label:'Nombre',actionUrl:'/products/categories/edit/', propId: 'id'},
            {key:'CategoryLevel', label:'Nivel'},
            {key:'Handle', label:'URL'},
            {key:'Delete',label:'Eliminar',destroy:true}
        ];

        vm.apiResource = productService.getCategories;
        vm.destroyFn =  productService.destroyCategorybyId;
        vm.openValueForm = openValueForm;
        vm.createForm = createForm;

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

        function openValueForm(ev, id) {
          console.log('createValue');
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: ProductCategoriesEditController,
            templateUrl: 'app/main/products/categories/edit/edit.html',
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

        function createForm(ev) {
          console.log('createValue');
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
          $mdDialog.show({
            controller: ProductCategoriesCreateController,
            templateUrl: 'app/main/products/categories/create/create.html',
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
    }

})();
