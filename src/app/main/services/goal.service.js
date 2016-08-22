(function (){
    'use strict';
    angular
        .module('app.services')
        .factory('goalService', goalService);

    function goalService($http, $q, api){
      return {
        create: create,
        findById: findById,
        update: update,
        getList: getList
      };

      function create(goal) {
        var url = '/goal/create/';
        return api.$http.post(url, {goal: goal});
      }

      function findById(id) {
        var url    = '/goal/findById/';
        var params = {
          id: id
        };
        return api.$http.get(url, params).then(function(res){
          return res.data;
        });
      }

      function update(goal) {
        var url    = '/goal/update/';
        var params = {
          goal: goal
        };
        return api.$http.post(url, params).then(function(res){
          return res.data;
        });

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
