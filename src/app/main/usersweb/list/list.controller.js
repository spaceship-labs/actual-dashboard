(function ()
{
    'use strict';

    angular
        .module('app.usersweb.list')
        .controller('UsersWebListController', UsersWebListController);

    /** @ngInject */
    function UsersWebListController(api, userWebService)
    {
        var vm = this;
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/usersweb/edit/', propId: 'id'},
            {key:'email', label:'Email', actionUrl:'/usersweb/edit/'},
            {key:'firstName', label:'Nombre'},
            {key:'lastName', label:'Apellidos'},
            {key:'role', label: 'Rol'}
        ];
        vm.apiResource = userWebService.getList;
    }

})();
