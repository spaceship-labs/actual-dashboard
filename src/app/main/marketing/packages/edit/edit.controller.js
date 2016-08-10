(function ()
{
    'use strict';

    angular
        .module('app.marketing.packages.edit')
        .controller('MarketingPackagesditController', MarketingPackagesditController);

    /** @ngInject */
    function MarketingPackagesditController($stateParams, productService, packageService, dialogService){
        var vm = this;

        angular.extend(vm,{
          calculateDiscount: calculateDiscount,
          init: init,
          update: update,
          formatProducts: formatProducts
        });

        function init(){
          productService.getGroupById($stateParams.id).then(function(res){
            vm.packageGroup = res.data;
            return packageService.getProductsByPackage(vm.packageGroup.id);
          })
          .then(function(resProducts){
            console.log(resProducts);
            vm.products = resProducts.data;
            vm.products = vm.formatProducts(vm.products);
          })
          .catch(function(err){
            console.log(err);
          })
        }

        function formatProducts(products){
          products = products.map(function(p){
            console.log(p);
            p.packageInfo = p.PackagesInfo[0] || {};
            p.packageInfo.discountType = p.packageInfo.discountType || 'percentage';
            p.packageInfo.discount = p.packageInfo.discount || 0;
            p.packageInfo.quantity = p.packageInfo.quantity || 1;
            return p;
          });
          return products;
        }

        function update(form){
          if(form.$valid){
            vm.isLoading = true;
            var params = {
              productsInfo: vm.products.map(function(p){
                var pInfo = {
                  packageInfo: p.packageInfo,
                  packageId: vm.packageGroup.id,
                  productId: p.id
                };
                return pInfo;
              })
            }
            packageService.updatePackageProducts(params).then(function(res){
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
          var quantity = product.packageInfo.quantity;
          var discount = product.packageInfo.discount;
          var discountType = product.packageInfo.discountType;
          var subtotal = quantity * unitPrice;
          var total = 0;
          discount = discount || 0;
          discountType = discountType || 'ammount';
          if(discountType == 'percentage'){
            total = subtotal - (subtotal/100 * discount);
          }else{
            total = subtotal - discount;
          }
          return total;
        }

        vm.init();
    }
})();
