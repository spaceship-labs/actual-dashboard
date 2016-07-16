(function ()
{
    'use strict';

    angular
        .module('app.marketing.create')
        .controller('MarketingCreateController', MarketingCreateController);

    /** @ngInject */
    function MarketingCreateController($scope, $q,commonService, productService, promoService, api, dialogService){
        var vm = this;

        angular.extend(vm, {
          groups: [],
          selectedCategories: [],
          search: {
            groups:[],
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
          init: init,
          create: create,
          formatCategoryGroups: formatCategoryGroups,
          formatSelectedFilterValues: formatSelectedFilterValues,
          groupSelectedCategories: groupSelectedCategories,
          loadCompanies: loadCompanies,
          loadCategories: loadCategories,
          loadCustomBrands: loadCustomBrands,
          loadFilters: loadFilters,
          onSelectEndDate: onSelectEndDate,
          onSelectStartDate: onSelectStartDate,
          queryGroups: queryGroups,
          removeGroup: removeGroup,
          searchProds: searchProds,
          selectedGroupChange: selectedGroupChange,
          sortFiltersValues: sortFiltersValues,
        });


        function init(){
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
            console.log(res);
            vm.categoriesGroups = res.data;
            vm.formatCategoryGroups();
          });
        }

        function formatCategoryGroups(){
          for(var i=0;i<vm.categoriesGroups.length;i++){
            vm.selectedCategories[i] = [];
          }
        }

        function groupSelectedCategories(){
          vm.search.categories = [];
          for(var i=0; i<vm.categoriesGroups.length; i++){
            vm.search.categories = vm.search.categories.concat(vm.selectedCategories[i]);
          }
          console.log(vm.search.categories);
        }


        function formatSelectedFilterValues(){
          vm.search.filtervalues = [];
          vm.filters.forEach(function(filter){
            if(filter.selectedValues){
              filter.selectedValues.filter(function(sv){
                return sv && sv!=null;
              });
              vm.search.filtervalues = vm.search.filtervalues.concat(filter.selectedValues);
            }
          });
        }


        function sortFiltersValues(){
          vm.filters.forEach(function(filter){
            if(filter.ValuesOrder){
              var idsList = filter.ValuesOrder.split(',');

              if(idsList.length > 0 && filter.ValuesOrder){
                var baseArr = angular.copy(filter.Values);
                var newArr = [];
                idsList.forEach(function(id){
                  baseArr.forEach(function(val){
                    if(val.id == id){
                      newArr.push(val);
                    }
                  })
                });

                //If values are not in the order list
                filter.Values.forEach(function(val){
                  if( idsList.indexOf(val.id) < 0 ){
                    newArr.push(val);
                  }
                });

                if(newArr.length > 0){
                  filter.Values = newArr;
                }
              }
            }
          });
        }


        function loadFilters(){
          productService.getAllFilters().then(function(res){
            vm.filters = res.data;
            vm.sortFiltersValues();
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
          vm.groupSelectedCategories();
          vm.formatSelectedFilterValues();
          vm.isLoadingProducts = true;
          var params = angular.copy(vm.search);
          params.groups = params.groups.map(function(g){return g.id});
          params.noImages = true;
          productService.advancedSearch(params).then(function(res){
            if(res.data){
              vm.products = res.data.products.map(function(prod){
                prod.isActive = true;
                return prod;
              });
            }
            vm.isLoadingProducts = false;
          });
        }

        function onSelectStartDate(pikaday){
          vm.promotion.startDate = pikaday._d;
        }

        function onSelectEndDate(pikaday){
          vm.promotion.endDate = pikaday._d;
        }

        function create(form){
          if(form.$valid){
            vm.isLoading = true;
            var params = {
              Categories  : vm.search.categories,
              FilterValues: vm.search.filtervalues,
              CustomBrands: vm.search.customBrands,
              Groups      : vm.search.groups,
              OnStudio    : vm.search.OnStudio,
              OnHome      : vm.search.OnHome,
              OnKids      : vm.search.OnKids,
              OnAmueble   : vm.search.OnAmueble,
              Products    : vm.products
            };
            angular.extend(params, vm.promotion);
            console.log('params',params);
            promoService.create(params)
              .then(function(res){
                console.log(res.data);
                dialogService.showDialog('Datos guardados');
                vm.isLoading = false;
              })
              .catch(function(err){
                console.log(err);
                dialogService.showDialog('Error, revisa los datos');
                vm.isLoading = false;
              });
          }
        }

        $scope.$watch('vm.promotion.name', function(newVal, oldVal){
          if(newVal != oldVal){
            vm.promotion.code = commonService.formatHandle(newVal);
          }
        });

        vm.init();
    }
})();
