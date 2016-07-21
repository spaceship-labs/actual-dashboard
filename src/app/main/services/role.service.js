(function (){
    'use strict';
    angular
        .module('app.services')
        .factory('roleService', roleService);

    function roleService($http, $q, api){
      return {
        getRoles: getRoles
      };

      function getRoles() {
        var url = '/role/find/';
        return api.$http.post(url);
      }
    }
})();

