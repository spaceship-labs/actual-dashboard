(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('categoriesService', categoriesService);

    /** @ngInject */
    function categoriesService($http, $q, api){

      var service = {
        createSelectedArrays: createSelectedArrays,
        getSelectedCategories: getSelectedCategories
      };

      return service;

      function createSelectedArrays(groups, selectedMatrix){
        for(var i=0;i<groups.length;i++){
          selectedMatrix[i] = [];
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

      /*
      function getList(page, params){
        var p = page || 1;
        var url = '/user/find/' + p;
        return api.$http.post(url,params);
      }
      */

    }


})();
