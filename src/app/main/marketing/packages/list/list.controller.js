(function ()
{
    'use strict';

    angular
        .module('app.marketing.packages.list')
        .controller('MarketingPackagesListController', MarketingPackagesListController);

    /** @ngInject */
    function MarketingPackagesListController(api, packageService)
    {
        var vm = this;
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/marketing/packages/edit/', propId: 'id'},
            {key:'Name', label:'Nombre',actionUrl:'/marketing/packages/edit/', propId: 'id'},
        ];
        vm.apiResource = packageService.getList;
    }

})();
