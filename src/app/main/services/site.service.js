(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('siteService', siteService);

    /** @ngInject */
    function siteService($http, $q, api){

      var service = {
        update: update,
        findByHandle: findByHandle,
        getAll: getAll,
        find: find
      };

      return service;

      function findByHandle(handle){
        var url = '/site/findbyhandle/' + handle;
        return api.$http.post(url);
      }

      function update(handle, params){
        var url = '/site/update/' + handle;
        return api.$http.post(url,params);
      }

      function getAll(){
        var url = '/sites';
        return api.$http.get(url);
      }

      function find(page, params){
        var p = page || 1;
        var url = '/sites/find/' + p;
        return api.$http.post(url, params);
      }

    }


})();
