(function ()
{
    'use strict';

    angular
        .module('app.marketing.create')
        .controller('MarketingCreateController', MarketingCreateController);

    /** @ngInject */
    function MarketingCreateController($scope, $q,commonService, productService, promoService, api, dialogService, categoriesService, fvService){
        var vm = this;

        angular.extend(vm, {
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
            filterByStore: false
            //U_Empresa: false
          },
          showFilters: false,
          products: [],
          groupTypes: {
            'variations': 'Agrupador Variaciones',
            'environments': 'Agrupador Ambientes',
            'packages': 'Agrupador Paquetes',
            'relations': 'Agrupador Relaciones'
          },
          displays: [
            {label:'Ventas Offline', handle:'OnOffline'},
            {label:'Actual Studio (actualstudio.com) ', handle:'OnStudio'},
            {label:'Actual Home (actualhome.com)', handle:'OnHome'},
            {label:'Actual Kids (actualkids.com)', handle:'OnKids'},
            {label:'Amueble.com', handle:'OnAmueble'},
          ],
          paymentGroups:[
            {label:'Descuento grupo pago 1', discount:0, text:'Pago único', ewallet:0,ewalletType:'percentage'},
            {label:'Descuento grupo pago 2', discount:0, text:'3 Meses sin intereses', ewallet:0,ewalletType:'percentage'},
            {label:'Descuento grupo pago 3', discount:0, text:'6 y 9 Meses sin intereses', ewallet:0,ewalletType:'percentage'},
            {label:'Descuento grupo pago 4', discount:0, text:'12 meses sin intereses', ewallet:0,ewalletType:'percentage'},
            {label:'Descuento grupo pago 5', discount:0, text:'18 meses sin intereses', ewallet:0,ewalletType:'percentage'},
          ],
          sas: [
            //{label:'Ninguno', value:false},
            {label:'Actual Studio | 001', value:'001'},
            {label:'Actual Home | 002', value:'002'},
            {label:'Ambas | 003', value:'003'}
          ],
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
          productService.getAllFilters().then(function(res){
            vm.filters = res.data;
            vm.filters = fvService.sortFV(vm.filters);
            vm.loadedFilters = true;
          });
        }

        function loadCustomBrands(){
          vm.customBrands = [];
          productService.getCustomBrands().then(function(res){
            vm.customBrands = res.data;
          });
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
          console.log('form',form);
          if(form.$valid){
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
            vm.promotion.endDate = commonService.combineDateTime(vm.promotion.endDate,vm.endTime, 59);

            if(!vm.promotion.hasLM){
              delete vm.promotion.pushMoneyUnit;
              delete vm.promotion.pushMoneyUnitType;
            }

            var params = {
              Categories  : vm.search.categories,
              FilterValues: vm.search.filtervalues,
              CustomBrands: vm.search.customBrands,
              Groups      : groups,
              OnStudio    : vm.search.OnStudio,
              OnHome      : vm.search.OnHome,
              OnKids      : vm.search.OnKids,
              OnAmueble   : vm.search.OnAmueble,
              sas         : vm.search.sas,
              itemCode    : vm.search.itemCode,
              //U_Empresa   : vm.search.U_Empresa,
              Products    : products,
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
            console.log('params',params);
            vm.isLoading = false;
            promoService.create(params)
              .then(function(res){
                console.log(res.data);
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
