(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('categoriesService', categoriesService);

    /** @ngInject */
    function categoriesService($http, $q, api){

      var service = {
        createSelectedArrays    : createSelectedArrays,
        getSelectedCategories   : getSelectedCategories,
        getUnselectedCategories : getUnselectedCategories
      };

      return service;

      function createSelectedArrays(groups, selectedMatrix, options){
        options = options || {};
        for(var i=0;i<groups.length;i++){
          selectedMatrix[i] = [];
          if(options.selectAll){
            for(var j=0; j < groups[i].length; j++){
              selectedMatrix[i].push(groups[i][j].id);
            }
          }
        }
        return selectedMatrix;
      }

      function getSelectedCategories(groups,selectedMatrix){
        var selected = [];
        for(var i=0; i<groups.length; i++){
          selected = selected.concat(selectedMatrix[i]);
        }
        return selected;
      }

      function getUnselectedCategories(groups, selectedMatrix){
        var unselected = [];
        for(var i=0; i<groups.length; i++){
          for( var j=0; j<groups[i].length; j++ ){
            if( selectedMatrix.indexOf( groups[i][j].id ) == -1 ){
              unselected.push( groups[i][j].id );
            }
          }
        }
        return unselected;
      }

    }


})();
