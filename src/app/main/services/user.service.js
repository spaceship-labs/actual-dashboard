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
        getUsersSap: getUsersSap
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
        console.log(url);
        return api.$http.post(url,params);
      }

      function create(params){
        var url = '/user/create/';
        console.log(url);
        return api.$http.post(url,params);
      }

      function getUsersSap(){
        var url = '/usersap/get';
        return api.$http.get(url);
      }

    }


})();
