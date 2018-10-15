(function() {
  'use strict';

  angular.module('app.reports.ewalletRecords', []).config(config);

  /** @ngInject */
  function config($stateProvider) {
    $stateProvider.state('app.reports_ewallet_records', {
      url: '/ewallet-records-reports',
      views: {
        'content@app': {
          templateUrl: 'app/main/reports/ewalletrecords/ewallet-records.html',
          controller: 'EwalletRecordsListController as vm',
        },
      },
      resolve: {},
      moduleName: 'ewallet-records-reports',
    });
  }
})();
