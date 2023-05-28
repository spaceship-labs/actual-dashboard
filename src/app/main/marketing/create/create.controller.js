(function (){
    'use strict';
    angular
        .module('app.marketing.create')
        .controller('MarketingCreateController', MarketingCreateController);

    /** @ngInject */
    function MarketingCreateController(
      $scope,
      $q,
      $location,
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
          promotion: {
            pushMoneyUnit:0,
            pushMoneyUnitType: 'ammount'
          },
          products: [],
          displays: commonService.getDisplays(),
          paymentGroups: commonService.getPaymentGroups(),
          predefinedDiscounts: chunk(commonService.getPredefinedDiscounts()),
          sasPromos: commonService.getSocietiesPromos(),
          create                   : create,
          onSelectEndDate          : onSelectEndDate,
          onSelectStartDate        : onSelectStartDate,
          loadProducts: loadProducts
        });

        function init(){
          console.log("paymentGroups",vm.paymentGroups);
          console.log("predefinedDiscounts",vm.predefinedDiscounts);
        }

        $scope.$watch('vm.paymentGroups[0].discount', function(newVal,oldVal){
          if(newVal != oldVal && !isNaN(newVal)){
            var baseDiscount = newVal;
            vm.paymentGroups.forEach(function(pg, i){
              if(i !== 0){
                var dis =  (baseDiscount - (i*5));
                if(dis >= 0) pg.discount = dis;
              }
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

        function onSelectStartDate(pikaday){
          vm.promotion.startDate = pikaday._d;
          vm.myPickerEndDate.setMinDate(vm.promotion.startDate);
        }

        function onSelectEndDate(pikaday){
          vm.promotion.endDate = pikaday._d;
          vm.myPickerStartDate.setMaxDate(vm.promotion.endDate);
        }


        function create(form){
          if(form.$valid){
            vm.isLoading = true;

            vm.promotion.startDate = commonService.combineDateTime(vm.promotion.startDate,vm.startTime);
            vm.promotion.endDate = commonService.combineDateTime(vm.promotion.endDate,vm.endTime, 59);

            if(!vm.promotion.hasLM){
              delete vm.promotion.pushMoneyUnit;
              delete vm.promotion.pushMoneyUnitType;
            }

            var params = {
              discountPg1 : vm.paymentGroups[0].discount,
              discountPg2 : vm.paymentGroups[1].discount,
              discountPg3 : vm.paymentGroups[2].discount,
              discountPg4 : vm.paymentGroups[3].discount,
              discountPg5 : vm.paymentGroups[4].discount,

              discountTextPg1 : vm.paymentGroups[0].text,
              discountTextPg2 : vm.paymentGroups[1].text,
              discountTextPg3 : vm.paymentGroups[2].text,
              discountTextPg4 : vm.paymentGroups[3].text,
              discountTextPg5 : vm.paymentGroups[4].text,

              ewalletPg1 : vm.paymentGroups[0].ewallet,
              ewalletPg2 : vm.paymentGroups[1].ewallet,
              ewalletPg3 : vm.paymentGroups[2].ewallet,
              ewalletPg4 : vm.paymentGroups[3].ewallet,
              ewalletPg5 : vm.paymentGroups[4].ewallet,

              ewalletTypePg1 : vm.paymentGroups[0].ewalletType,
              ewalletTypePg2 : vm.paymentGroups[1].ewalletType,
              ewalletTypePg3 : vm.paymentGroups[2].ewalletType,
              ewalletTypePg4 : vm.paymentGroups[3].ewalletType,
              ewalletTypePg5 : vm.paymentGroups[4].ewalletType,

              discountRange1 : vm.paymentGroups[0].discount,
              discountRange2 : vm.paymentGroups[1].discount,
              discountRange3 : vm.paymentGroups[2].discount,
              discountRange4 : vm.paymentGroups[3].discount,
              discountRange5 : vm.paymentGroups[4].discount,
              discountRange6 : vm.paymentGroups[5].discount,
              discountRange7 : vm.paymentGroups[6].discount,
              discountRange8 : vm.paymentGroups[7].discount,
              discountRange9 : vm.paymentGroups[8].discount,
              discountRange10 : vm.paymentGroups[9].discount,

              discountRangePercent1 : vm.paymentGroups[0].discountPercent,
              discountRangePercent2 : vm.paymentGroups[1].discountPercent,
              discountRangePercent3 : vm.paymentGroups[2].discountPercent,
              discountRangePercent4 : vm.paymentGroups[3].discountPercent,
              discountRangePercent5 : vm.paymentGroups[4].discountPercent,
              discountRangePercent6 : vm.paymentGroups[5].discountPercent,
              discountRangePercent7 : vm.paymentGroups[6].discountPercent,
              discountRangePercent8 : vm.paymentGroups[7].discountPercent,
              discountRangePercent9 : vm.paymentGroups[8].discountPercent,
              discountRangePercent10 : vm.paymentGroups[9].discountPercent,

            };
            angular.extend(vm.promotion, params);

            promoService.create(vm.promotion)
              .then(function(res){
                var createdPromo = res.data;
                dialogService.showDialog('Promoción creada');
                $location.path('/marketing/edit/' + createdPromo.id);
                vm.isLoading = false;
              })
              .catch(function(err){
                console.log(err);
                dialogService.showDialog('Error, revisa los datos');
                vm.isLoading = false;
              });
          }else{
            dialogService.showDialog('Revisa los datos incompletos');
          }
        }

        $scope.$watch('vm.promotion.publicName', function(newVal, oldVal){
          if(newVal != oldVal){
            vm.promotion.code = commonService.formatHandle(newVal);
          }
        });

        function chunk(array) {
          var result = [];

          array.forEach(function(element, index) {
            var newPosition = index % 5;
            if (!result[newPosition]) {
              result[newPosition] = [];
            }
            result[newPosition].push(element);
          });

          return result;
        }

        init();
    }

})();
