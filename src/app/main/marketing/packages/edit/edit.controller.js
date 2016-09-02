(function ()
{
    'use strict';

    angular
        .module('app.marketing.packages.edit')
        .controller('MarketingPackagesditController', MarketingPackagesditController);

    /** @ngInject */
    function MarketingPackagesditController(
      $stateParams,
      productService,
      packageService,
      dialogService,
      api
    ){
        var vm = this;

        angular.extend(vm,{
          calculateTotalDiscount: calculateTotalDiscount,
          calculateDiscount: calculateDiscount,
          init: init,
          objIndexOf: objIndexOf,
          update: update,
          formatProducts: formatProducts
        });

        function init(){
          vm.isLoading = true;
          packageService.getDetailedPackage($stateParams.id).then(function(res){
            vm.packageGroup = res.data;
            return packageService.getProductsByPackage(vm.packageGroup.id);
          })
          .then(function(resProducts){
            console.log(resProducts);
            vm.products = resProducts.data;
            vm.products = vm.formatProducts(vm.products);
            vm.isLoading = false;
          })
          .catch(function(err){
            console.log(err);
          });
          loadStores();
        }

        function loadStores(){
          api.$http.get('/store/find').then(function(res){
            vm.stores = res.data;
          });
        }

        function formatProducts(products){
          products = products.map(function(p){
            p.packageRule = p.packageRule || {};
            p.packageRule.discountPg1 = p.packageRule.discountPg1 || 25;
            p.packageRule.quantity = p.packageRule.quantity || 1;

            var baseDiscount = p.packageRule.discount;
            var discountKeys = ['discountPg2','discountPg3','discountPg4','discountPg5'];
            for(var i=0;i<discountKeys.length; i++){
              var dis =  (baseDiscount - ( (i+1) *5));
              if(dis >= 0){
                p.packageRule[discountKeys[i]] = p.packageRule[discountKeys[i]] ||  dis;
              }
            }


            return p;
          });
          return products;
        }

        function update(form){
          if(form.$valid){
            vm.isLoading = true;
            var params = {
              packageRules: vm.products.map(function(p){
                var pInfo = {
                  packageRule: p.packageRule,
                  packageId: vm.packageGroup.id,
                  productId: p.id
                };
                return pInfo;
              }),
              Stores: vm.selectedStores || []
            }
            packageService.update(vm.packageGroup.id, params)
              .then(function(res){
                console.log(res);
                vm.isLoading = false;
                dialogService.showDialog('Paquete actualizado');
              }).catch(function(err){
                console.log(err);
                vm.isLoading = false;
                dialogService.showDialog('Hubo un error, revisa la información');
              });

          }else{
            dialogService.showDialog('Información incompleta, revisa tus datos');
          }
        }

        function calculateDiscount(product){
          var unitPrice = product.Price;
          var quantity = product.packageRule.quantity;
          var discount = product.packageRule.discountPg1;
          var subtotal = quantity * unitPrice;
          var total = 0;
          discount = discount || 0;
          total = subtotal - (subtotal/100 * discount);
          return total;
        }

        function calculateTotalDiscount(){
          var total = 0;
          if(vm.products){
            vm.products.forEach(function(p){
              total += calculateDiscount(p);
            });
          }
          return total;
        }


        function objIndexOf(arr, query){
          return _.findWhere(arr, query);
        }

        vm.init();
    }
})();
