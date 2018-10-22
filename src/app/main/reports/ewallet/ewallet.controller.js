(function() {
  'use strict';

  angular
    .module('app.reports.ewallet')
    .controller('EwalletListController', EwalletListController);

  /** @ngInject */
  //Test Commit
  function EwalletListController(api, ewalletService) {
    var vm = this;
    vm.columns = [
      { key: 'createdAt', label: 'Fecha', propId: 'id', date: true },
      { key: 'cardNumber', label: 'Número de Monedero' },
      { key: 'Client.CardName', label: 'Cliente' },
      { key: 'Store.name', label: 'Tienda' },
      { key: 'Client.E_Mail', label: 'Email' },
      { key: 'Client.Phone1', label: 'Teléfono' },
      { key: 'amount', label: 'Total de puntos' },
    ];
    vm.apiResource = ewalletService.getList;
  }
})();
