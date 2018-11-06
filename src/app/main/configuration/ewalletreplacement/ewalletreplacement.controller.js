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
      ewalletService.updateReplacement(id);
    };
    vm.columns = [
      { key: 'createdAt', label: 'Fecha', propId: 'id', date: true },
      { key: 'Client.CardName', label: 'Cliente' },
      { key: 'Store.name', label: 'Tienda' },
      { key: 'note', label: 'Notas' },
      { key: 'status', label: 'Estatus' },
      {
        key: 'Edit',
        label: 'Aceptar Reposición',
        onClickCell: true,
      },
    ];
    vm.apiResource = ewalletService.getReplacementList;
  }
})();
