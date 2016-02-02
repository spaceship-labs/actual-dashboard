(function(){

  'use strict';

  /**
   * @ngdoc function
   * @name dashexampleApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the dashexampleApp
   */
  function HomeCtrl($scope, localStorageService){

    $scope.token = localStorageService.get('token');
    $scope.user = localStorageService.get('user');

  }

  angular.module('dashexampleApp').controller('HomeCtrl', HomeCtrl);
  MainCtrl.$inject = ['$scope','localStorageService'];

})();
