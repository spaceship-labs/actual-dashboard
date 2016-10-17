(function (){
  'use strict';
  angular
      .module('app.services')
      .factory('commissionsService', commissionsService);

  function commissionsService($http, $q, api) {
    return {
      getList: getList,
      runReport: runReport,
      all: all
    };

    function getList(page, _params){
      var url    = '/commission/find/';
      var params = Object.assign({} ,_params, {
        page: page || 1
      });
      return api.$http.post(url, params);
    }

    function runReport(filters) {
      var url = '/commission/report';
      var params = filters;
      return api.$http.post(url, params);
    }

    function all(filters) {
      var url = '/commission/all';
      var params = filters;
      return api.$http.post(url, params).then(function(res){return res.data;});
    }

  }
})();
