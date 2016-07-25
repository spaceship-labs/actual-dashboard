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

      function getList(page, params) {
        var url = '/goal/find/';
        params.page = page;
        if (!params.filters) {
          delete params.filters;
        }
        return api.$http.get(url, params);
      }
    }
})();
