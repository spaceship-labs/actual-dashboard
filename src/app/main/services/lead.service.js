(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('leadService', leadService);

    /** @ngInject */
    function leadService($http, $q, api){

      var service = {
        getList: getList,
      };

      return service;

      function getList(page, params){
        var p = page || 1;
        var url = '/saleopportunity/find/' + p;
        return api.$http.post(url,params);
      }

    }


})();
