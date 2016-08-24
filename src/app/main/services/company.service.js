(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('companyService', companyService);

    /** @ngInject */
    function companyService($http, $q, api){
      return {
        getAllCompanies: getAllCompanies,
        countSellersGeneral: countSellersGeneral,
        countSellersProject: countSellersProject
      };

      function getAllCompanies() {
        var url = '/company/getAll';
        return api.$http.get(url).then(function(res){
          return res.data;
        });
      }

      function countSellersGeneral(company) {
        var url    = '/company/countSellersGeneral';
        var params = {
          company: company
        };
        return api.$http.get(url, params).then(function(res) {
          return res.data;
        });
      }

      function countSellersProject(company) {
        var url    = '/company/countSellersProject';
        var params = {
          company: company
        };
        return api.$http.get(url, params).then(function(res) {
          return res.data;
        });
      }

    }
})();
