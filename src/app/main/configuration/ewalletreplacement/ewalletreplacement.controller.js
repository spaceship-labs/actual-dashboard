(function() {
  'use strict';

  angular
    .module('app.configuration.ewalletreplacement')
    .controller(
      'ConfigEwalletReplacementController',
      ConifgEwalletReplacementController
    );

  /** @ngInject */
  function ConifgEwalletReplacementController(
    $http,
    api,
    $scope,
    $timeout,
    commonService,
    dialogService,
    ewalletService
  ) {
    var vm = this;

    angular.extend(vm, {
      init: init,
      update: update,
    });

    init();

    function init() {}

    function update() {}
  }
})();
