(function ()
{
    'use strict';

    angular
        .module('app.marketing.pm.list')
        .controller('MarketingPMListController', MarketingPMListController);

    /** @ngInject */
    function MarketingPMListController(api, pmPeriodService)
    {
        var vm = this;
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/marketing/pm/edit/', propId: 'id'},
            {key:'startDate', label:'Empieza', date:true},
            {key:'endDate', label: 'Termina', date:true},
            {key:'paymentGroup1', label:'G.P 1', yesNo: true},
            {key:'paymentGroup2', label:'G.P 2', yesNo: true},
            {key:'paymentGroup3', label:'G.P 3', yesNo: true},
            {key:'paymentGroup4', label:'G.P 4', yesNo: true},
            {key:'paymentGroup5', label:'G.P 5', yesNo: true}
        ];
        vm.apiResource = pmPeriodService.find;
    }

})();
