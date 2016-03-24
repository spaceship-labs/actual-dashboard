(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('invoiceService', invoiceService);

    /** @ngInject */
    function invoiceService($http, $q, api){

      var service = {
        getList: getList,
      };

      return service;

      function getList(page, params){
        var p = page || 1;
        var url = '/invoice/find/' + p;
        return api.$http.post(url,params);
      }

    }


})();
