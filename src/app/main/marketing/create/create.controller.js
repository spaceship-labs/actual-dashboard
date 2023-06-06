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
          inputs: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          displays: commonService.getDisplays(),
          paymentGroups: commonService.getPaymentGroups(),
          predefinedDiscounts: commonService.getPredefinedDiscounts(),
          sasPromos: commonService.getSocietiesPromos(),
          productTypeInputs: [],
          newInput: {
            value: '',
            option: ''
          },
          productTypeOptions: commonService.getProductTypes(),
          create                   : create,
          onSelectEndDate          : onSelectEndDate,
          onSelectStartDate        : onSelectStartDate,
          loadProducts: loadProducts,
          updateInputs : updateInputs,
          addInput : addInput,
        });

        function init(){
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

              discountRange1 : vm.inputs[0],
              discountRange2 : vm.inputs[1],
              discountRange3 : vm.inputs[2],
              discountRange4 : vm.inputs[3],
              discountRange5 : vm.inputs[4],
              discountRange6 : vm.inputs[5],
              discountRange7 : vm.inputs[6],
              discountRange8 : vm.inputs[7],
              discountRange9 : vm.inputs[8],
              discountRange10 : vm.inputs[9],

              discountRangePercent1 : vm.predefinedDiscounts[0].discountPercent,
              discountRangePercent2 : vm.predefinedDiscounts[1].discountPercent,
              discountRangePercent3 : vm.predefinedDiscounts[2].discountPercent,
              discountRangePercent4 : vm.predefinedDiscounts[3].discountPercent,
              discountRangePercent5 : vm.predefinedDiscounts[4].discountPercent,
              discountRangePercent6 : vm.predefinedDiscounts[5].discountPercent,
              discountRangePercent7 : vm.predefinedDiscounts[6].discountPercent,
              discountRangePercent8 : vm.predefinedDiscounts[7].discountPercent,
              discountRangePercent9 : vm.predefinedDiscounts[8].discountPercent,
              discountRangePercent10 : vm.predefinedDiscounts[9].discountPercent,

              productTypeDiscounts : vm.productTypeInputs,

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

        function updateInputs (index) {
          if (vm.inputs[index] && index < vm.inputs.length - 1) {
            vm.inputs[index + 1] = vm.inputs[index] + 1;
          }
          console.log("vm.inputs",vm.inputs);
          console.log("vm.predefinedDiscounts",vm.predefinedDiscounts);
        };

        function addInput () {
          if (vm.newInput.value && vm.newInput.option) {
            vm.productTypeInputs.push({
              value: vm.newInput.value,
              option: vm.newInput.option 
            });
            vm.newInput = {
              value: '',
              option: '',
            };
          }
          console.log(vm.productTypeInputs);
        };

        init();
    }

})();
