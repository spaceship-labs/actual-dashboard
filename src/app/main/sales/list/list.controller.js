(function ()
{
    'use strict';

    angular
        .module('app.sales.list')
        .controller('SalesListController', SalesListController);

    /** @ngInject */
    function SalesListController(DTOptionsBuilder, DTColumnBuilder, api, $q)
    {
        var vm = this;
        // Data
        vm.columns = [
            {key:'id', label:'ID'},
            {key:'OpprId', label:'OpprId'},
            {key:'CardCode', label:'CardCode'},
            {key:'OpenDate', label:'OpenDate'},
            {key:'Status', label:'Status'},
            {key:'CardName', label:'CardName'},

        ];

        vm.apiResource = api.lead.find.get;

        // Methods

        //////////
    }

})();
