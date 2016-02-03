(function(){

  'use strict';

  /**
   * @ngdoc function
   * @name dashexampleApp.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the dashexampleApp
   */
  function HomeCtrl($scope, localStorageService){

    $scope.token = localStorageService.get('token');
    $scope.user = localStorageService.get('user');

  }

  angular.module('dashexampleApp').controller('HomeCtrl', HomeCtrl);
  HomeCtrl.$inject = ['$scope','localStorageService'];

})();
