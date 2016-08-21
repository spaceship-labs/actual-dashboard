(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('companyService', companyService);

    /** @ngInject */
    function companyService($http, $q, api){
      return {
        getAllCompanies: getAllCompanies,
        countSellers: countSellers
      };

      function getAllCompanies() {
        var url = '/company/getAll';
        return api.$http.get(url).then(function(res){
          return res.data;
        });
      }

      function countSellers(company) {
        var url    = '/company/countSellers';
        var params = {
          company: company
        };
        return api.$http.get(url, params).then(function(res) {
          return res.data;
        });
      }
    }
})();
