(function ()
{
    'use strict';

    angular
        .module('app.marketing.edit')
        .controller('MarketingCreateController', MarketingCreateController);

    /** @ngInject */
    function MarketingCreateController($scope, $q,commonService, productService){
        var vm = this;

        vm.init = init;
        vm.loadCategories = loadCategories;
        vm.loadFilters = loadFilters;
        vm.sortFiltersValues = sortFiltersValues;
        vm.loadCustomBrands = loadCustomBrands;
        vm.queryGroups = queryGroups;
        vm.selectedGroupChange = selectedGroupChange;
        vm.removeGroup = removeGroup;
        vm.searchProds = searchProds;
        vm.formatCategoryGroups = formatCategoryGroups;
        vm.formatSelectedFilterValues = formatSelectedFilterValues;
        vm.groupSelectedCategories = groupSelectedCategories;

        vm.groups = [];
        vm.selectedCategories = [];
        vm.search = {
          groups:[],
          limit: 999999
        };
        vm.products = [];

        vm.groupTypes = {
          'variations': 'Agrupador Variaciones',
          'environments': 'Agrupador Ambientes',
          'packages': 'Agrupador Paquetes',
          'relations': 'Agrupador Relaciones'
        };

        vm.stores = [
          {label:'Actual Studio', handle:'Actual Studio'},
          {label:'Actual Home', handle:'Actual Home'},
          {label:'Actual Kids', handle:'Actual Kids'},
          {label:'Actual Group', handle:'Actual Group'},
        ];

        vm.displays = [
          {label:'Ventas Offline', handle:'OnOffline'},
          {label:'Actual Studio (actualstudio.com) ', handle:'OnStudio'},
          {label:'Actual Home (actualhome.com)', handle:'OnHome'},
          {label:'Actual Kids (actualkids.com)', handle:'OnKids'},
          {label:'Amueble.com', handle:'OnAmueble'},
        ];

        function init(){
          vm.loadCategories();
          vm.loadFilters();
          vm.loadCustomBrands();
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
            if(filter.IsMultiple && filter.selectedValues){
              vm.search.filtervalues = vm.search.filtervalues.concat(filter.selectedValues);
            }
            else if(filter.selectedValue){
              var val = filter.Values[filter.selectedValue];
              if(val){
                vm.search.filtervalues.push( val.id );
              }
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

        $scope.$watch('vm.promotion.Name', function(newVal, oldVal){
          if(newVal != oldVal){
            vm.promotion.Handle = commonService.formatHandle(newVal);
          }
        });

        vm.init();
    }
})();
