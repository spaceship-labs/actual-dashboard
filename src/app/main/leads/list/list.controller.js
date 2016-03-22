(function ()
{
    'use strict';

    angular
        .module('app.leads.list')
        .controller('LeadsListController', LeadsListController);

    /** @ngInject */
    function LeadsListController(leadService)
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

        vm.apiResource = leadService.getList;

        // Methods

        //////////
    }

})();
