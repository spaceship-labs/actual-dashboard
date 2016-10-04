(function (){
  'use strict';
  angular
      .module('app.services')
      .factory('commissionsService', commissionsService);

  function commissionsService($http, $q, api) {
    return {
      getList: getList
    };

    function getList(page, _params){
      var url    = '/commission/find/';
      var params = Object.assign({} ,_params, {
        page: page || 1
      });
      return api.$http.post(url, params);
    }

  }
})();
