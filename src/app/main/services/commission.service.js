(function (){
    'use strict';
    angular
        .module('app.services')
        .factory('commissionService', commissionService);

    function commissionService($http, $q, api){
      return {
        create: create,
        update: update,
        find: find,
        findById: findById,
        getList: getList
      };

      function create(commission) {
        var url = '/commission/create/';
        return api.$http.post(url, {commission: commission});
      }

      function update(params) {
        var url = '/commission/update/';
        console.log(params);
        return api.$http.post(url, params);
      }

      function getList(page, params) {
        var url = '/commission/search/';
        params.page = page;
        if (!params.filters) {
          delete params.filters;
        }
        return api.$http.get(url, params);
      }

      function find() {
        var url = '/commission/find/';
        return api.$http.get(url);
      }

      function findById(id) {
        var url = '/commission/findById/' + id;
        return api.$http.get(url).then(function(res){
          return res.data;
        });
      }
    }
})();
