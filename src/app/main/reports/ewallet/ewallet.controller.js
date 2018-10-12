(function() {
  'use strict';

  angular
    .module('app.reports.ewallet')
    .controller('EwalletListController', EwalletListController);

  /** @ngInject */
  function EwalletListController(api, ewalletService) {
    var vm = this;
    vm.columns = [
      { key: 'Date', label: 'Fecha', propId: 'id' },
      { key: 'client', label: 'Cliente' },
      { key: 'store', label: 'Tienda' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Teléfono' },
      { key: 'points', label: 'Total de puntos' },
    ];
    vm.apiResource = EwalletService.getList;
  }
})();
