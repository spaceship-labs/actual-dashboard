(function ()
{
    'use strict';

    angular
        .module('app.marketing.list')
        .controller('MarketingListController', MarketingListController);

    /** @ngInject */
    function MarketingListController(api, promoService)
    {
        var vm = this;

        // Data
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/marketing/edit/', propId: 'id'},
            {key:'name', label:'Nombre', actionUrl:'/marketing/edit/'},
            {key:'code', label:'Código'},
            {key:'startDate', label:'Empieza', date:true},
            {key:'endDate', label: 'Termina', date:true},
            {key:'discountPg1', label:'Descuento G.P 1'}
        ];

        //vm.apiResource = api.user.find.get;
        vm.apiResource = promoService.find;
        // Methods

        //////////
    }

})();
