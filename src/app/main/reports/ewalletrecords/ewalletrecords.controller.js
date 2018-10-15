(function() {
  'use strict';

  angular
    .module('app.reports.ewallet')
    .controller('EwalletRecordsListController', EwalletRecordsListController);

  /** @ngInject */
  function EwalletRecordsListController(api, ewalletService) {
    var vm = this;
    vm.columns = [
      { key: 'createdAt', label: 'Fecha', propId: 'id', date: true },
      { key: 'Ewallet.cardNumber', label: 'Número de Monedero' },
      { key: 'Store.name', label: 'Tienda' },
      { key: 'movement', label: 'Movimiento' },
      { key: 'amount', label: 'Cantidad' },
    ];
    vm.apiResource = ewalletService.getRecordsList;
  }
})();
