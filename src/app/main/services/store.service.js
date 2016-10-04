(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('storeService', storeService);

    /** @ngInject */
    function storeService($http, $q, api){
      return {
        getAllStores: getAllStores,
        countSellers: countSellers,
        commissionables: commissionables
      };

      function getAllStores() {
        var url = '/store/getAll';
        return api.$http.get(url).then(function(res){
          return res.data;
        });
      }

      function countSellers(store) {
        var url    = '/store/countSellers';
        var params = {
          store: store
        };
        return api.$http.get(url, params).then(function(res) {
          return res.data;
        });
      }

      function commissionables(store) {
        var url    = '/store/getCommissionables';
        var params = store ? {store: store} : {};
        return api.$http.get(url, params).then(function(res) {
          return res.data;
        });
      }
    }
})();
