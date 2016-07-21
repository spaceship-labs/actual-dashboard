(function (){
    'use strict';
    angular
        .module('app.services')
        .factory('goalService', goalService);

    function goalService($http, $q, api){
      return {
        create: create
      };

      function create(goal) {
        var url = '/goal/create/';
        return api.$http.post(url, {goal: goal});
      }
    }
})();
