(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('packageService', packageService);

    /** @ngInject */
    function packageService($http, $q, api){

      var service = {
        getList: getList,
        getDetailedPackage: getDetailedPackage,
        getProductsByPackage: getProductsByPackage,
        update: update
      };

      function getList(page, params){
        var p = page || 1;
        var url = '/packages/find/' + p;
        return api.$http.post(url,params);
      }

      function getProductsByPackage(id){
        var url = '/packages/'+id+'/products';
        return api.$http.post(url);
      }

      function update(id, params){
        var url = '/packages/update/' + id;
        return api.$http.post(url,params);
      }

      function getDetailedPackage(id){
        var url = '/packages/details/'+id;
        return api.$http.post(url);
      }

      return service;
    }

})();
