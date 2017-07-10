(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('userWebService', userWebService);

    /** @ngInject */
    function userWebService($http, $q, api){

      var service = {
        getList: getList,
        getUser: getUser,
        update: update,
        create: create,
      };

      return service;

      function getList(page, params){
        var p = page || 1;
        var url = '/userweb/find/' + p;
        return api.$http.post(url,params);
      }

      function getUser(id){
        var url = '/userweb/findbyid/' + id;
        return api.$http.post(url);
      }

      function update(id, params){
        var url = '/userweb/update/' + id;
        return api.$http.post(url, params);
      }

      function create(params){
        var url = '/userweb/create/';
        return api.$http.post(url,params);
      }

    }
})();
