(function ()
{
    'use strict';

    angular
        .module('app.invoices.list')
        .controller('InvoicesListController', InvoicesListController);

    /** @ngInject */
    function InvoicesListController(invoiceService)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'id', label:'ID'},
            {key:'ItemCode', label:'ItemCode'},
            {key:'Quantity', label:'Quantity'},
            {key:'Price', label:'Price'},
            {key:'DocDate', label:'DocDate'},
            {key:'ShipToCode', label:'ShipToCode'},
            {key:'DocEntry', label:'DocEntry'},
            {key:'LineNum', label:'LineNum'}

        ];

        vm.apiResource = invoiceService.getList;

        // Methods

        //////////
    }

})();
