(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('pmPeriodService', pmPeriodService);

    /** @ngInject */
    function pmPeriodService($http,localStorageService, api){

      var service = {
        create: create,
        update: update,
        destroy: destroy,
        find: find,
        findById: findById
      };

      return service;

      function create(params){
        var url = '/pmperiod/create/';
        return api.$http.post(url, params);
      }

      function update(id,params){
        var url = '/pmperiod/update/' + id;
        return api.$http.post(url, params);
      }

      function destroy(id){
        var url = '/pmperiod/destroy/' + id;
        return api.$http.post(url);
      }

      function find(page,params){
        var url = '/pmperiod/find/' + page;
        return api.$http.post(url, params);
      }

      function findById(id){
        var url = '/pmperiod/findbyid/' + id;
        return api.$http.post(url);
      }



    }


})();
