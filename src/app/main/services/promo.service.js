(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('promoService', promoService);

    /** @ngInject */
    function promoService($http,localStorageService, api){

      var service = {
        create: create,
        update: update,
        destroy: destroy,
        find: find
      };

      return service;

      function create(params){
        var url = '/promotion/create/';
        return api.$http.post(url, params);
      }

      function update(id,params){
        var url = '/promotion/update/' + id;
        return api.$http.post(url, params);
      }

      function destroy(id){
        var url = '/promotion/destroy/' + id;
        return api.$http.post(url);
      }

      function find(page,params){
        var url = '/promotion/find/' + page;
        return api.$http.post(url, params);
      }



    }


})();
