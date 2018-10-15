(function() {
  'use strict';

  angular
    .module('app.reports', [
      'app.reports.ewallet',
      'app.reports.ewalletRecords',
    ])
    .config(config);

  /** @ngInject */
  function config(msNavigationServiceProvider) {
    // Navigation
    msNavigationServiceProvider.saveItem('reports', {
      title: 'Reportes',
      group: false,
      weight: 2,
      state: 'app.reports',
    });
    msNavigationServiceProvider.saveItem('reports.ewallet', {
      title: 'Monedero Electrónico',
      state: 'app.reports_ewallet',
    });
    msNavigationServiceProvider.saveItem('reports.ewalletRecords', {
      title: 'Movimientos de Monedero Electrónico',
      state: 'app.reports_ewallet_records',
    });
  }
})();
