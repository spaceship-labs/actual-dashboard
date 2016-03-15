(function ()
{
    'use strict';

    angular
        .module('app.commissions.list')
        .controller('CommissionsListController', CommissionsListController);

    /** @ngInject */
    function CommissionsListController(DTOptionsBuilder, DTColumnBuilder, api, $q)
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
