(function() {
  'use strict';

  angular.module('app.reports.ewallet', []).config(config);

  /** @ngInject */
  function config($stateProvider) {
    $stateProvider.state('app.reports_ewallet', {
      url: '/ewallet-reports',
      views: {
        'content@app': {
          templateUrl: 'app/main/reports/ewallet/ewallet.html',
          controller: 'EwalletListController as vm',
        },
      },
      resolve: {},
      moduleName: 'ewallet-reports',
    });
  }
})();
