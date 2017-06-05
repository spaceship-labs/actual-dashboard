(function (){
    'use strict';
    angular
        .module('app.marketing.spotlight')
        .controller('MarketingSpotlightController', MarketingSpotlightController);

    /** @ngInject */
    function MarketingSpotlightController(
      $scope,
      productService,
      dialogService
    ){
        var vm = this;

        angular.extend(vm, {
          importedDataXls: [],
          itemCodes: [],
          setSpotlightProducts: setSpotlightProducts
        });

        init();

        function init(){
          productService.getSpotlightProducts()
            .then(function(res){
              if(res.data && _.isArray(res.data) ){
                var products = res.data;
                vm.itemCodes = products.map(function(p){
                  return p.ItemCode;
                });
              }
            })
            .catch(function(err){
              console.log('err', err);
              dialogService.showDialog('Hubo un error al cargar los productos');
            });
        }

        function setSpotlightProducts(){
          vm.isLoading = true;

          productService.setSpotlightProducts(vm.itemCodes)
            .then(function(res){
              dialogService.showDialog('Productos destacados guardados');
              vm.isLoading = false;
            })
            .catch(function(err){
              vm.isLoading = false;
              dialogService.showDialog('Hubo un error');
            });
        }

        $scope.$watch('vm.importedDataXls', function(newVal, oldVal){
          if(newVal != oldVal && angular.isArray(newVal)){

            if( !checkIfAllItemsAreProducts(newVal) ){
              dialogService.showDialog('Formato incorrecto');
              return;
            }

            vm.itemCodes = [];
            vm.itemCodes = newVal.map(function(item){
              return item.itemcode;
            });

          }
        });

        function checkIfAllItemsAreProducts(arr){
          return _.every(arr, function(item){
            return item.itemcode;
          })
        }


    }

})();
