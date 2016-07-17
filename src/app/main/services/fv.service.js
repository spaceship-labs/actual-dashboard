(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('fvService', fvService);

    /** @ngInject */
    function fvService($http, $q, api){

      var service = {
        getSelectedFV: getSelectedFV,
        sortFV: sortFV,
      };

      return service;

      function getSelectedFV(filters, opts){
        var selected = [];
        filters.forEach(function(filter){
          if( ( filter.IsMultiple || (opts && opts.multiples) ) && filter.selectedValues){
            filter.selectedValues.filter(function(sv){
              return sv && sv!=null;
            });
            selected = selected.concat(filter.selectedValues);
          }else if(filter.selectedValue){
            selected.push(val);
          }
        });
        return selected;
      }

        function sortFV(filters){
          filters.forEach(function(filter){
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
          return filters;
        }

    }


})();
