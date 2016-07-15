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

        vm.groups = [];

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
            vm.groups.push(item);
            //$mdAutocomplete.clear();
          }
          //vm.selectedProduct = undefined;
          //vm.searchText = '';
        }

        function removeGroup(index){
          vm.groups.splice(index, 1);
        }

        $scope.$watch('vm.promotion.Name', function(newVal, oldVal){
          if(newVal != oldVal){
            vm.promotion.Handle = commonService.formatHandle(newVal);
          }
        });

        vm.init();
    }
})();
