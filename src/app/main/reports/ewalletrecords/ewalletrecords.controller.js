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
    vm.exportQuery = 'SELECT Ewallet->cardNumber AS Numero_de_Monedero, ';
    vm.exportQuery += 'Store->name AS Tienda, ';
    vm.exportQuery += 'movement AS Movimiento, ';
    vm.exportQuery += 'amount AS Cantidad, ';
    vm.exportQuery +=
      'INTO XLS("movimientos-de-monederos.xls",{headers:true}) FROM ?';
  }
})();
