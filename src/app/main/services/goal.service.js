(function (){
    'use strict';
    angular
        .module('app.services')
        .factory('goalService', goalService);

    function goalService($http, $q, api){
      return {
        create: create,
        update: update,
        findById: findById,
        getList: getList
      };

      function create(goal) {
        var url = '/goal/create/';
        return api.$http.post(url, {goal: goal});
      }

      function update(params) {
        var url = '/goal/update/';
        return api.$http.get(url, params);
      }

      function getList(page, params) {
        var url = '/goal/find/';
        params.page = page;
        if (!params.filters) {
          delete params.filters;
        }
        return api.$http.get(url, params);
      }

      function findById(id) {
        var url = '/goal/findById/' + id;
        return api.$http.get(url).then(function(res){
          return res.data;
        });
      }
    }
})();
