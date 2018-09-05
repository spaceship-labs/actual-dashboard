(function() {
  'use strict';

  angular
    .module('app.configuration.ewallet')
    .controller('ConfigEwalletController', ConifgEwalletController);

  /** @ngInject */
  function ConifgEwalletController(
    $http,
    api,
    $scope,
    zipcodeService,
    dialogService
  ) {
    var vm = this;

    angular.extend(vm, {
      init: init,
    });

    init();

    function init() {
      console.log('Controller Init');
    }
  }
})();
