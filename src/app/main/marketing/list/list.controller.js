(function ()
{
    'use strict';

    angular
        .module('app.marketing.list')
        .controller('MarketingListController', MarketingListController);

    /** @ngInject */
    function MarketingListController(api, userService)
    {
        var vm = this;

        // Data
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/marketing/edit/', propId: 'id'},
            {key:'email', label:'Email', actionUrl:'/marketing/edit/'},
            {key:'firstName', label:'Nombre'},
            {key:'lastName', label:'Apellidos'},
            {key:'userType', label: 'Rol'}
        ];

        //vm.apiResource = api.user.find.get;
        vm.apiResource = userService.getList;
        // Methods

        //////////
    }

})();
