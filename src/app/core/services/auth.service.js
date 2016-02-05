(function (){
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    /** @ngInject */
    function authService($http,localStorageService, api){

      var service = {
        signUp: signUp,
        signIn: signIn,
        logout: logout
      };

      return service;


      function signUp(data, success, error) {
         $http.post(api.baseUrl + '/auth/signup', data).success(success).error(error);
      }

      function signIn(data, success, error) {
         $http.post(api.baseUrl + '/auth/signin', data).success(success).error(error);
      }

      function logout(success) {
        localStorageService.remove('token');
        localStorageService.remove('user');

        success();
      }

    }


})();
