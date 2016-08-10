(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('packageService', packageService);

    /** @ngInject */
    function packageService($http, $q, api){

      var service = {
        getList: getList,
        getProductsByPackage: getProductsByPackage,
        updatePackageProducts: updatePackageProducts
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

      function updatePackageProducts(params){
        var url = '/packages/packageproducts/update';
        return api.$http.post(url,params);
      }

      return service;
    }

})();
