(function ()
{
    'use strict';

    angular
        .module('app.marketing.packages.edit')
        .controller('MarketingPackagesditController', MarketingPackagesditController);

    /** @ngInject */
    function MarketingPackagesditController(
      $scope,
      $stateParams,
      productService,
      packageService,
      dialogService,
      commonService,
      api
    ){
        var vm = this;

        angular.extend(vm,{
          calculateTotalDiscount: calculateTotalDiscount,
          calculateDiscount: calculateDiscount,
          init: init,
          objIndexOf: objIndexOf,
          update: update,
          formatProducts: formatProducts,
          displays: commonService.getDisplays()
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

        function assignDiscountsToPackageRule(packageRule){
          var baseDiscount = packageRule.discount;
          var discountKeys = ['discountPg2','discountPg3','discountPg4','discountPg5'];
          for(var i=0;i<discountKeys.length; i++){
            var dis =  (baseDiscount - ( (i+1) *5));
            if(dis >= 0){
              packageRule[discountKeys[i]] = packageRule[discountKeys[i]] ||  dis;
            }
          }
          return packageRule;
        }

        function formatProducts(products){
          products = products.map(function(p){
            p.packageRule = p.packageRule || {};
            p.packageRule.discountPg1 = p.packageRule.discountPg1 || 25;
            p.packageRule.quantity = p.packageRule.quantity || 1;
            p.packageRule = assignDiscountsToPackageRule(p.packageRule);
            return p;
          });
          return products;
        }

        function getSelectedDisplays(){
          var selectedDisplaysHash = vm.displays.reduce(function(hash,display){
            if(vm.packageGroup[display.handle]){
              hash[display.handle] = true;
            }
            return hash;
          },{});
          return selectedDisplaysHash;
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
              Stores: vm.selectedStores || [],
            };

            var selectedDisplaysHash = getSelectedDisplays();
            params = _.extend(params, selectedDisplaysHash);

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

        function calculateDiscount(product ,discountPercent){
          var unitPrice = product.Price;
          var quantity = product.packageRule.quantity;
          var discount = discountPercent;
          var subtotal = quantity * unitPrice;
          var total = 0;
          discount = discount || 0;
          total = subtotal - (subtotal/100 * discount);
          return total;
        }

        function calculateTotalDiscount(discountGroupKey){
          var total = 0;
          if(vm.products){
            vm.products.forEach(function(p){
              total += calculateDiscount(p, p.packageRule[discountGroupKey]);
            });
          }
          return total;
        }

        function objIndexOf(arr, query){
          return _.findWhere(arr, query);
        }

        function checkAllMark(display){
          if(display){
            vm.toggleAllDisplays = false;
          }
        }


        $scope.$watch('vm.toggleAllDisplays', function(newVal, oldVal){
          if(newVal != oldVal && newVal === true){
            vm.displays.forEach(function(display){
              vm.packageGroup[display.handle] = newVal;
            });
          }
        });        

        vm.init();
    }
})();
