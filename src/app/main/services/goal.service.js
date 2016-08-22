(function (){
    'use strict';
    angular
        .module('app.services')
        .factory('goalService', goalService);

    function goalService($http, $q, api){
      return {
        create: create,
        getList: getList
      };

      function create(goal) {
        var url = '/goal/create/';
        return api.$http.post(url, {goal: goal});
      }

      function getList(page, _params){
        var url    = '/goal/find/';
        var params = Object.assign({} ,_params, {
          page: page || 1
        });
        return api.$http.post(url, params);
      }
    }
})();
