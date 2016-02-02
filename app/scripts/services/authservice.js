(function(){
  'use strict';

  /**
   * @ngdoc service
   * @name dashexampleApp.AuthService
   * @description
   * # AuthService
   * Service in the dashexampleApp.
   */
  function AuthService($http,localStorageService, urls){

    var serv = this;
    serv.signUp = signUp;
    serv.signIn = signIn;
    serv.logout = logout;


    function signUp(data, success, error) {
       $http.post(urls.BASE + '/auth/signup', data).success(success).error(error);
    }

    function signIn(data, success, error) {
       $http.post(urls.BASE + '/auth/signin', data).success(success).error(error);
    }

    function logout(success) {
      localStorageService.remove('token');
      localStorageService.remove('user');

       success();
    }


  }
  angular.module('dashexampleApp').service('AuthService', AuthService);
  AuthService.$inject = ['$http', 'localStorageService', 'urls'];

})();
