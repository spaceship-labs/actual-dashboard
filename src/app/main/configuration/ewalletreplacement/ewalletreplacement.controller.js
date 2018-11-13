(function() {
  'use strict';

  angular
    .module('app.configuration.ewalletreplacement')
    .controller(
      'ConfigEwalletReplacementController',
      ConifgEwalletReplacementController
    );

  /** @ngInject */
  function ConifgEwalletReplacementController(api, ewalletService) {
    var vm = this;
    vm.onClickCell = function(id) {
      console.log('CONTROLLER LLEGA');
      ewalletService.updateReplacement(id);
    };
    vm.columns = [
      { key: 'createdAt', label: 'Fecha', propId: 'id', date: true },
      { key: 'Client.CardName', label: 'Cliente' },
      { key: 'Client.E_Mail', label: 'Email' },
      { key: 'Client.Phone1', label: 'Telefono' },
      {
        key: 'requestedBy.firstName',
        label: 'Vendedor'
      },
      { key: 'Store.name', label: 'Tienda' },
      { key: 'status', label: 'Estatus' },
      { key: 'Files', label: 'Archivos', filesList: true },
      {
        key: 'Edit',
        label: 'Aceptar Reposición',
        onClickCell: true
      }
    ];
    vm.apiResource = ewalletService.getReplacementList;
    vm.exportQuery = 'SELECT createdAt AS Fecha, ';
    vm.exportQuery += 'Client->CardName AS Cliente, ';
    vm.exportQuery += 'Client->E_Mail AS Email, ';
    vm.exportQuery += 'Client->Phone1 AS Telefono, ';
    vm.exportQuery += 'requestedBy->firstName AS Vendedor, ';
    vm.exportQuery += '[Store]->name AS Tienda, ';
    vm.exportQuery += 'status AS Estatus ';
    vm.exportQuery +=
      'INTO XLS("reposicion-de-monedero.xls",{headers:true}) FROM ?';
  }
})();
