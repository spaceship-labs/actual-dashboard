(function ()
{
    'use strict';

    angular
        .module('app.marketing.edit')
        .controller('MarketingEditController', MarketingEditController);

    /** @ngInject */
    function MarketingEditController($scope, $q, $stateParams, $timeout ,commonService, productService, promoService, api, dialogService, categoriesService, fvService){
        var vm = this;

        angular.extend(vm, {
          myPickerEndDate: {},
          myPickerStartDate: {},
          groups: [],
          selectedCategories: [],
          selectedCompanies: [],
          search: {
            groups:[],
            categories:[],
            filtervalues:[],
            limit: 999999
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
            {label:'Descuento grupo pago 1', discount:0},
            {label:'Descuento grupo pago 2', discount:0},
            {label:'Descuento grupo pago 3', discount:0},
            {label:'Descuento grupo pago 4', discount:0},
            {label:'Descuento grupo pago 5', discount:0},
          ],
          init: init,
          combineDateTime: combineDateTime,
          getExcludedNum: getExcludedNum,
          loadCategories: loadCategories,
          loadCompanies: loadCompanies,
          loadCustomBrands: loadCustomBrands,
          loadFilters: loadFilters,
          objIndexOf: objIndexOf,
          onSelectEndDate: onSelectEndDate,
          onSelectStartDate: onSelectStartDate,
          queryGroups: queryGroups,
          removeGroup: removeGroup,
          searchProds: searchProds,
          selectedGroupChange: selectedGroupChange,
          setPromoDiscounts: setPromoDiscounts,
          update: update,
        });

        $scope.$watch('vm.paymentGroups[0].discount', function(newVal,oldVal){
          if(newVal != oldVal && !isNaN(newVal)){
            var baseDiscount = newVal;
            vm.paymentGroups.forEach(function(pg, i){
              if(i != 0){
                var dis =  (baseDiscount - (i*5));
                if(dis >= 0) pg.discount = dis;
              }
            })
          }
        });

        function combineDateTime(date, time){
          var date = moment(date);
          time = moment(time);
          date = date.set({
             'hour' : time.get('hour'),
             'minute'  : time.get('minute'),
             'second' : time.get('second')
          });
          return date.toDate();
        }

        function objIndexOf(arr, query){
          return _.findWhere(arr, query);
        }

        function getExcludedNum(){
          return _.where(vm.products, {isActive: false}).length;
        }

        function setPromoDiscounts(promo){
          var keys = ['discountPg1','discountPg2','discountPg3','discountPg4','discountPg5'];
          vm.paymentGroups = vm.paymentGroups.map(function(pg, index){
            pg.discount = promo[keys[index]] || 0;
            return pg;
          });
        }

        function init(){
          vm.isLoading = true;
          promoService.findById($stateParams.id).then(function(res){
            vm.promotion = res.data;
            console.log(vm.promotion);
            vm.startTime = new Date(angular.copy(vm.promotion.startDate));
            vm.endTime = new Date(angular.copy(vm.promotion.endDate));

            vm.search.groups = vm.promotion.Groups;
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
          vm.loadCategories();
          vm.loadFilters();
          vm.loadCustomBrands();
          vm.loadCompanies();
        }

        function loadCompanies(){
          api.$http.get('/company/find').then(function(res){
            vm.companies = res.data;
          });
        }

        function loadCategories(){
          productService.getCategoriesGroups().then(function(res){
            vm.categoriesGroups = res.data;
            vm.selectedCategories = categoriesService.createSelectedArrays(vm.categoriesGroups, vm.selectedCategories);
          }).catch(function(err){
            console.log(err);
          });
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
            vm.searchDone = true;
            vm.search.categories = categoriesService.getSelectedCategories(vm.categoriesGroups, vm.selectedCategories);
            vm.search.filtervalues = fvService.getSelectedFV(vm.filters, {multiples:true});
            vm.isLoadingProducts = true;
            var params = angular.copy(vm.search);
            params.groups = params.groups.map(function(g){return g.id});
            params.noImages = true;
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
            vm.promotion.startDate = vm.combineDateTime(vm.promotion.startDate,vm.startTime);
            vm.promotion.endDate = vm.combineDateTime(vm.promotion.endDate,vm.endTime);
            vm.search.categories = categoriesService.getSelectedCategories(vm.categoriesGroups, vm.selectedCategories);
            vm.search.filtervalues = fvService.getSelectedFV(vm.filters, {multiples:true});
            var params = {
              name        : vm.promotion.name,
              code        : vm.promotion.code,
              startDate   : vm.promotion.startDate,
              endDate     : vm.promotion.endDate,
              hasLM       : vm.promotion.hasLM,
              Companies   : vm.selectedCompanies,
              Categories  : vm.search.categories,
              FilterValues: vm.search.filtervalues,
              CustomBrands: vm.search.customBrands,
              Groups      : groups,
              OnStudio    : vm.search.OnStudio,
              OnHome      : vm.search.OnHome,
              OnKids      : vm.search.OnKids,
              OnAmueble   : vm.search.OnAmueble,
              Products    : products,
              excludedProducts: vm.excluded,
              discountPg1 : vm.paymentGroups[0].discount,
              discountPg2 : vm.paymentGroups[1].discount,
              discountPg3 : vm.paymentGroups[2].discount,
              discountPg4 : vm.paymentGroups[3].discount,
              discountPg5 : vm.paymentGroups[4].discount,
            };

            if(vm.promotion.hasLM){
              params.pushMoneyUnit = vm.promotion.pushMoneyUnit;
              params.pushMoneyUnitType = vm.promotion.pushMoneyUnitType;
            }

            //angular.extend(params, vm.promotion);
            console.log('params',params);
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
            dialogService.showDialog('Revisa los datos incompletos');
          }
        }

        vm.init();
    }
})();
