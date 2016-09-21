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
          groups                  : [],
          selectedCategories      : [],
          selectedStores          : [],
          products                : [],
          showFilters             : false,
          search: {
            groups:[],
            categories:[],
            filtervalues:[],
            sas: [],
            limit: 999999,
            //U_Empresa:false,
            filterByStore: false
          },
          groupTypes: commonService.getGroupTypes(),
          displays: commonService.getDisplays(),
          paymentGroups: commonService.getPaymentGroups(),

          //SA's from SAP
          sas: commonService.getSocieties(),
          getExcludedNum        : getExcludedNum,
          objIndexOf            : objIndexOf,
          onSelectEndDate       : onSelectEndDate,
          onSelectStartDate     : onSelectStartDate,
          queryGroups           : queryGroups,
          removeGroup           : removeGroup,
          searchProds           : searchProds,
          selectedGroupChange   : selectedGroupChange,
          setPromoDiscounts     : setPromoDiscounts,
          selectAllCategories   : selectAllCategories,
          unselectAllCategories : unselectAllCategories,
          update                : update,
        });

        function objIndexOf(arr, query){
          return _.findWhere(arr, query);
        }

        function getExcludedNum(){
          return _.where(vm.products, {isActive: false}).length;
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
            console.log(vm.promotion);
            vm.startTime = new Date(angular.copy(vm.promotion.startDate));
            vm.endTime = new Date(angular.copy(vm.promotion.endDate));

            vm.search.groups = vm.promotion.Groups;
            //vm.search.SA = vm.promotion.SA;
            //vm.search.U_Empresa = vm.promotion.U_Empresa;
            vm.search.sas = vm.promotion.sas;
            vm.search.itemCode = vm.promotion.itemCode || [];
            vm.products = vm.promotion.Products;
            vm.products = vm.products.map(function(prod){
              prod.isActive = true;
              return prod;
            });
            vm.setPromoDiscounts(vm.promotion);
            vm.isLoading = false;

            $timeout(function(){
              console.log(vm.promotion);
              vm.myPickerEndDate.setMinDate(new Date(vm.promotion.startDate) );
              vm.myPickerStartDate.setMaxDate( new Date(vm.promotion.endDate) );
            },1000);

          }).catch(function(err){
            console.log(err);
          })
          loadCategories();
          loadFilters();
          loadCustomBrands();
          loadStores();
        }

        function loadStores(){
          api.$http.get('/store/find').then(function(res){
            vm.stores = res.data;
          });
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            vm.categoriesGroups   = res.data;
            vm.selectedCategories = categoriesService.createSelectedArrays(
              vm.categoriesGroups,
              vm.selectedCategories
            );
          }).catch(function(err){
            console.log(err);
          });
        }

        function loadFilters(){
          productService.getAllFilters().then(function(res){
            vm.filters       = res.data;
            vm.filters       = fvService.sortFV(vm.filters);
            vm.loadedFilters = true;
          });
        }

        function loadCustomBrands(){
          vm.customBrands = [];
          productService.getCustomBrands().then(function(res){
            vm.customBrands = res.data;
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

        function queryGroups(term){
          console.log(term);
          if(term != '' && term){
            var deferred = $q.defer();
            var params = {term: term, autocomplete: true};
            productService.searchGroups(params).then(function(res){
              console.log(res);
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
            vm.searchDone = true;
            vm.search.categories          = categoriesService.getSelectedCategories(vm.categoriesGroups, vm.selectedCategories);
            vm.search.filtervalues        = fvService.getSelectedFV(vm.filters, {multiples:true});
            var params                    = angular.copy(vm.search);
            params.filterByStore          = false;
            params.groups                 = params.groups.map(function(g){return g.id});
            params.populatePromotions     = false;
            params.populateImgs           = false;
            vm.isLoadingProducts          = true;
            productService.advancedSearch(params).then(function(res){
              vm.isLoadingProducts = false;
              if(res.data){
                var productsResponse = _.isArray(res.data.products) ? res.data.products : [];
                vm.products = productsResponse.map(function(prod){
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

        function update(form){
          if(form.$valid && !vm.isLoadingProducts){
            vm.isLoading = true;
            vm.excluded = _.reduce(vm.products, function(excluded, prod){
              if(!prod.isActive) excluded.push({id:prod.id,ItemCode:prod.ItemCode});
              return excluded;
            },[]);
            var groups = _.reduce(vm.search.groups,function(gs, g){
              gs.push(g.id);
              return gs;
            }, []);
            var products = _.reduce(vm.products,function(prods, p){
              if(p.isActive) prods.push(p.id);
              return prods;
            }, []);
            vm.promotion.startDate = commonService.combineDateTime(vm.promotion.startDate,vm.startTime);
            vm.promotion.endDate = commonService.combineDateTime(vm.promotion.endDate,vm.endTime,59);
            vm.search.categories = categoriesService.getSelectedCategories(vm.categoriesGroups, vm.selectedCategories);
            vm.search.filtervalues = fvService.getSelectedFV(vm.filters, {multiples:true});
            var params = {
              publicName        : vm.promotion.publicName,
              name              : vm.promotion.name,
              code              : vm.promotion.code,
              startDate         : vm.promotion.startDate,
              endDate           : vm.promotion.endDate,
              hasLM             : vm.promotion.hasLM,
              Stores            : vm.selectedStores,
              Categories        : vm.search.categories,
              FilterValues      : vm.search.filtervalues,
              CustomBrands      : vm.search.customBrands,
              Groups            : groups,
              OnStudio          : vm.search.OnStudio,
              OnHome            : vm.search.OnHome,
              OnKids            : vm.search.OnKids,
              OnAmueble         : vm.search.OnAmueble,
              itemCode          : vm.search.itemCode,
              sas               : vm.search.sas,
              Products          : products,
              excludedProducts  : vm.excluded,
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

            promoService.update(vm.promotion.id, params)
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
