(function (){
    'use strict';

    angular
        .module('app.services')
        .factory('userService', userService);

    /** @ngInject */
    function userService($http, $q, api){

      var service = {
        getList: getList,
        getUser: getUser,
        update: update,
        create: create,
        getSellers: getSellersUnselected
      };

      return service;

      function getList(page, params){
        var p = page || 1;
        var url = '/user/find/' + p;
        return api.$http.post(url,params);
      }

      function getUser(id){
        var url = '/user/findbyid/' + id;
        return api.$http.post(url);
      }

      function update(id, params){
        var url = '/user/update/' + id;
        return api.$http.post(url, params);
      }

      function create(params){
        var url = '/user/create/';
        return api.$http.post(url,params);
      }


      function getSellers(){
        var url = '/seller/getall/';
        return api.$http.post(url);
      }

      function getSellersUnselected(){
        var url = '/seller/getallunselected/';
        return api.$http.post(url);
      }
    }
})();
