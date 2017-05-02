(function ()
{
    'use strict';

    angular
        .module('app.marketing.edit')
        .controller('MarketingEditController', MarketingEditController);

    /** @ngInject */
    function MarketingEditController(
      $scope, 
      $q, 
      $stateParams, 
      $timeout,
      commonService, 
      productService, 
      promoService, 
      api, 
      dialogService, 
      categoriesService, 
      fvService
    ){
        var vm = this;

        angular.extend(vm, {
          myPickerEndDate         : {},
          myPickerStartDate       : {},
          products                : [],
          paymentGroups: commonService.getPaymentGroups(),
          //SA's from SAP
          sasPromos: commonService.getSocietiesPromos(),
          objIndexOf            : objIndexOf,
          onSelectEndDate       : onSelectEndDate,
          onSelectStartDate     : onSelectStartDate,
          loadProducts: loadProducts,
          update: update,
        });

        $scope.$watch('vm.importDataXls', function(newVal, oldVal){
          if(newVal != oldVal && angular.isArray(newVal)){
            vm.search.itemCode = newVal.map(function(item){
              return item.itemcode;
            });
          }
        });

        function loadProducts(){
          vm.isLoadingProducts = true;
          var params = {
            sa:vm.promotion.sa,
            discount: vm.paymentGroups[0].discount
          };
          
          promoService.searchPromotionProducts(params)
            .then(function(res){
              vm.isLoadingProducts = false;
              vm.products = res.data;
            })
            .catch(function(err){
              vm.isLoadingProducts = false;
              console.log(err);
              dialogService.showDialog('Hubo un error al cargar los productos');
            });
        }

        function objIndexOf(arr, query){
          return _.findWhere(arr, query);
        }

        function setPromoDiscounts(promo){
          var keysD = ['discountPg1','discountPg2','discountPg3','discountPg4','discountPg5'];
          var keysT = ['discountTextPg1','discountTextPg2','discountTextPg3','discountTextPg4','discountTextPg5'];
          var keysEW = ['ewalletPg1','ewalletPg2','ewalletPg3','ewalletPg4','ewalletPg5'];
          var keysEWType = ['ewalletTypePg1','ewalletTypePg2','ewalletTypePg3','ewalletTypePg4','ewalletTypePg5'];
          vm.paymentGroups = vm.paymentGroups.map(function(pg, index){
            pg.discount = promo[keysD[index]] || 0;
            pg.text = promo[keysT[index]];
            pg.ewallet = promo[keysEW[index]];
            pg.ewalletType = promo[keysEWType[index]];
            return pg;
          });
        }

        function init(){
          vm.isLoading = true;
          promoService.findById($stateParams.id).then(function(res){
            vm.promotion = res.data;
            vm.promotion.pushMoneyUnitType = vm.promotion.pushMoneyUnitType || 'ammount';
            vm.promotion.pushMoneyUnit     = vm.promotion.pushMoneyUnit || 0;
            vm.startTime = new Date(angular.copy(vm.promotion.startDate));
            vm.endTime = new Date(angular.copy(vm.promotion.endDate));
            

            setPromoDiscounts(vm.promotion);
            vm.isLoading = false;

            $timeout(function(){
              vm.myPickerEndDate.setMinDate(new Date(vm.promotion.startDate) );
              vm.myPickerStartDate.setMaxDate( new Date(vm.promotion.endDate) );
            },1000);

          }).catch(function(err){
            console.log(err);
          });

        }

        function onSelectStartDate(pikaday){
          vm.promotion.startDate = pikaday._d;
          vm.myPickerEndDate.setMinDate(vm.promotion.startDate);
        }

        function onSelectEndDate(pikaday){
          vm.promotion.endDate = pikaday._d;
          vm.myPickerStartDate.setMaxDate(vm.promotion.endDate);
        }

        function update(form){
          if(form.$valid && !vm.isLoadingProducts){
            vm.isLoading = true;

            vm.promotion.startDate = commonService.combineDateTime(vm.promotion.startDate,vm.startTime);
            vm.promotion.endDate = commonService.combineDateTime(vm.promotion.endDate,vm.endTime,59);
            var params = {
              discountPg1       : vm.paymentGroups[0].discount,
              discountPg2       : vm.paymentGroups[1].discount,
              discountPg3       : vm.paymentGroups[2].discount,
              discountPg4       : vm.paymentGroups[3].discount,
              discountPg5       : vm.paymentGroups[4].discount,

              discountTextPg1   : vm.paymentGroups[0].text,
              discountTextPg2   : vm.paymentGroups[1].text,
              discountTextPg3   : vm.paymentGroups[2].text,
              discountTextPg4   : vm.paymentGroups[3].text,
              discountTextPg5   : vm.paymentGroups[4].text,

              ewalletPg1        : vm.paymentGroups[0].ewallet,
              ewalletPg2        : vm.paymentGroups[1].ewallet,
              ewalletPg3        : vm.paymentGroups[2].ewallet,
              ewalletPg4        : vm.paymentGroups[3].ewallet,
              ewalletPg5        : vm.paymentGroups[4].ewallet,

              ewalletTypePg1    : vm.paymentGroups[0].ewalletType,
              ewalletTypePg2    : vm.paymentGroups[1].ewalletType,
              ewalletTypePg3    : vm.paymentGroups[2].ewalletType,
              ewalletTypePg4    : vm.paymentGroups[3].ewalletType,
              ewalletTypePg5    : vm.paymentGroups[4].ewalletType,
            };

            if(vm.promotion.hasLM){
              params.pushMoneyUnit = vm.promotion.pushMoneyUnit;
              params.pushMoneyUnitType = vm.promotion.pushMoneyUnitType;
            }

            angular.extend(vm.promotion, params);

            promoService.update(vm.promotion.id, vm.promotion)
              .then(function(res){
                console.log(res.data);
                dialogService.showDialog('Promoción actualizada');
                vm.isLoading = false;
              })
              .catch(function(err){
                console.log(err);
                dialogService.showDialog('Error, revisa los datos');
                vm.isLoading = false;
              });
          }else{
            console.log(form);
            dialogService.showDialog('Revisa los datos incompletos');
          }
        }

        init();
    }
})();
