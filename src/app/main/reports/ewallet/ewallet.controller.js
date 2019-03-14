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
      { key: 'Files', label: 'Archivos', filesList: true },
    ];
    vm.apiResource = ewalletService.getList;
    vm.exportQuery = 'SELECT cardNumber AS Numero_de_Monedero, ';
    vm.exportQuery += 'Client->CardName AS Cliente, ';
    vm.exportQuery += 'Client->E_Mail AS Email, ';
    vm.exportQuery += 'Client->Phone1 AS Telefono, ';
    vm.exportQuery += '[Store]->name AS Tienda, ';
    vm.exportQuery += 'amount AS Total_de_puntos ';
    vm.exportQuery +=
      'INTO XLS("monederos-electrónicos.xls",{headers:true}) FROM ?';
    vm.exportQuery +=
      'INTO XLS("reposicion-de-monedero.xls",{headers:true}) FROM ?';
  }
})();
