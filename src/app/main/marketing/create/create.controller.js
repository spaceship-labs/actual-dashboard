(function (){
    'use strict';
    angular
        .module('app.marketing.create')
        .controller('MarketingCreateController', MarketingCreateController);

    /** @ngInject */
    function MarketingCreateController(
      $scope, 
      $q,
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
          importDataXls: [],
          promotion: {
            pushMoneyUnit:0,
            pushMoneyUnitType: 'ammount'
          },
          groups: [],
          selectedCategories: [],
          search: {
            groups:[],
            categories:[],
            filtervalues:[],
            sas: [],
            limit: 999999,
            filterByStore: false,
            itemCode: []
          },
          showFilters: false,
          products: [],
          groupTypes: commonService.getGroupTypes(),
          displays: commonService.getDisplays(),
          paymentGroups: commonService.getPaymentGroups(),
          sas: commonService.getSocieties(),
          create                   : create,
          getExcludedNum           : getExcludedNum,
          onSelectEndDate          : onSelectEndDate,
          onSelectStartDate        : onSelectStartDate,
          queryGroups              : queryGroups,
          removeGroup              : removeGroup,
          searchProds              : searchProds,
          selectAllCategories      : selectAllCategories,
          unselectAllCategories    : unselectAllCategories,          
          selectedGroupChange      : selectedGroupChange,
        });

        function init(){
          loadCategories();
          loadFilters();
          loadCustomBrands();
          loadStores();
        }

        $scope.$watch('vm.paymentGroups[0].discount', function(newVal,oldVal){
          if(newVal != oldVal && !isNaN(newVal)){
            var baseDiscount = newVal;
            vm.paymentGroups.forEach(function(pg, i){
              if(i != 0){
                var dis =  (baseDiscount - (i*5));
                if(dis >= 0) pg.discount = dis;
              }
            });
          }
        });

        $scope.$watch('vm.importDataXls', function(newVal, oldVal){
          if(newVal != oldVal && angular.isArray(newVal)){
            vm.search.itemCode = newVal.map(function(item){
              return item.itemcode;
            });
          }
        });

        function loadStores(){
          api.$http.get('/store/find').then(function(res){
            vm.stores = res.data;
          });
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            vm.categoriesGroups = res.data;
            vm.selectedCategories = categoriesService.createSelectedArrays(
              vm.categoriesGroups, 
              vm.selectedCategories,
              {selectAll: true}
            );
          }).catch(function(err){
            console.log(err);
          });
        }

        function selectAllCategories(){
          var options = {selectAll: true};
          vm.selectedCategories = categoriesService.createSelectedArrays(
            vm.categoriesGroups, 
            vm.selectedCategories,
            options
          );          
        }     

        function unselectAllCategories(){
          vm.selectedCategories = categoriesService.createSelectedArrays(
            vm.categoriesGroups, 
            vm.selectedCategories
          );          
        }   


        function loadFilters(){
          productService.getAllFilters()
            .then(function(res){
              vm.filters = res.data;
              vm.filters = fvService.sortFV(vm.filters);
              vm.loadedFilters = true;
            })
            .catch(function(err){
              console.log(err);
            });
        }

        function loadCustomBrands(){
          vm.customBrands = [];
          productService.getCustomBrands()
            .then(function(res){
              vm.customBrands = res.data;
            })
            .catch(function(err){
              console.log(err);
            })
        }

        function queryGroups(term){
          if(term != '' && term){
            var deferred = $q.defer();
            var params = {term: term, autocomplete: true};
            productService.searchGroups(params).then(function(res){
              deferred.resolve(res.data.data);
            });
            return deferred.promise;
          }
          else{
            return [];
          }
        }

        function selectedGroupChange(item){
          if(item && item.id){
            vm.selectedGroup = null;
            vm.searchGroupText = null;
            vm.search.groups.push(item);
          }
        }

        function removeGroup(index){
          vm.search.groups.splice(index, 1);
        }

        function searchProds(){
          if(!vm.isLoadingProducts){
            vm.isLoadingProducts          = true;
            vm.search.categories          = categoriesService.getSelectedCategories(vm.categoriesGroups, vm.selectedCategories);
            vm.search.filtervalues        = fvService.getSelectedFV(vm.filters, {multiples:true});
            var params                    = angular.copy(vm.search);
            params.groups                 = params.groups.map(function(g){return g.id});
            params.populateImgs           = false;
            params.populatePromotions     = false;
            params.filterByStore          = false;            
            productService.advancedSearch(params).then(function(res){
              vm.isLoadingProducts = false;
              if(res.data){
                vm.products = res.data.products.map(function(prod){
                  prod.isActive = true;
                  return prod;
                });
              }
            });
          }
        }

        function onSelectStartDate(pikaday){
          vm.promotion.startDate = pikaday._d;
          vm.myPickerEndDate.setMinDate(vm.promotion.startDate);
        }

        function onSelectEndDate(pikaday){
          vm.promotion.endDate = pikaday._d;
          vm.myPickerStartDate.setMaxDate(vm.promotion.endDate);
        }

        function getExcludedNum(){
          return _.where(vm.products, {isActive: false}).length;
        }

        function create(form){
          if(form.$valid){
            vm.isLoading = true;
            vm.excluded = _.reduce(vm.products, function(excluded, prod){
              if(!prod.isActive) excluded.push({id:prod.id,ItemCode:prod.ItemCode});
              return excluded;
            },[]);
            var groupsIds = _.reduce(vm.search.groups,function(gs, g){
              gs.push(g.id);
              return gs;
            }, []);
            var productsIds = _.reduce(vm.products,function(prods, p){
              if(p.isActive) prods.push(p.id);
              return prods;
            }, []);
            vm.promotion.startDate = commonService.combineDateTime(vm.promotion.startDate,vm.startTime);
            vm.promotion.endDate = commonService.combineDateTime(vm.promotion.endDate,vm.endTime, 59);

            if(!vm.promotion.hasLM){
              delete vm.promotion.pushMoneyUnit;
              delete vm.promotion.pushMoneyUnitType;
            }

            var params = {
              Categories  : vm.search.categories,
              FilterValues: vm.search.filtervalues,
              CustomBrands: vm.search.customBrands,
              Groups      : groupsIds,
              OnStudio    : vm.search.OnStudio,
              OnHome      : vm.search.OnHome,
              OnKids      : vm.search.OnKids,
              OnAmueble   : vm.search.OnAmueble,
              sas         : vm.search.sas,
              itemCode    : vm.search.itemCode,
              //U_Empresa   : vm.search.U_Empresa,
              Products    : productsIds,
              excludedProducts: vm.excluded,

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

            };
            angular.extend(params, vm.promotion);
            vm.isLoading = false;
            promoService.create(params)
              .then(function(res){
                dialogService.showDialog('Promoción creada');
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

        init();
    }

})();
