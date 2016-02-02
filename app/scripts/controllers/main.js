(function(){

  'use strict';

  /**
   * @ngdoc function
   * @name dashexampleApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the dashexampleApp
   */
  function MainCtrl($rootScope, $scope, $location, localStorageService, AuthService){

    function successAuth(res){
      console.log(res);
      //$scope.$storage.token = res.token;
      //$scope.$storage.user = res.user;
      localStorageService.set('token', res.token);
      localStorageService.set('user', res.user);

      $scope.token = res.token;
      $scope.user = res.user;

      console.log($scope.user);

      $location.path('/home');
    }

    function successRegister(res){
      console.log(res);
      localStorageService.set('token', res.data.token);
      localStorageService.set('user', res.data.user);

      $scope.token = res.data.token;
      $scope.user = res.data.user;
      $location.path('/home');

    }

    $scope.loginData = {};
    $scope.registerData = {};

    $scope.signIn = function(){
      var formData = {
        email: $scope.loginData.email,
        password: $scope.loginData.password
      };

      AuthService.signIn(formData, successAuth, function(){
        $rootScope.error = 'Invalid credentials';
      });
    };

    $scope.signUp = function(){
      var formData = {
        email: $scope.registerData.email,
        password: $scope.registerData.password
      };

      AuthService.signUp(formData, successRegister, function(){
        $rootScope.error = 'Invalid credentials';
      });
    };

    $scope.logout = function () {
      AuthService.logout(function () {
        $location.path('/');
      });
    };

    $scope.token = localStorageService.get('token');
    $scope.user = localStorageService.get('user');
    console.log($scope.user);
    //$scope.tokenClaims = AuthService.getTokenClaims();


  }

  angular.module('dashexampleApp').controller('MainCtrl', MainCtrl);
  MainCtrl.$inject = ['$rootScope', '$scope', '$location', 'localStorageService', 'AuthService'];

})();
