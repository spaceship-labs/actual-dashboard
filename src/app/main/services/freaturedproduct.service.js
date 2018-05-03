(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('featuredProductService', featuredProductService);

    /** @ngInject */
    function featuredProductService($http, $q, api){

      var service = {
        find: find,
        create: create
      };

      return service;

      function find(site){
        var url = '/featuredproduct/' + site;
        return api.$http.get(url);
      }

      function create(params){
        var url = '/featuredproduct';
        return api.$http.post(url,params);
      }

    }


})();
