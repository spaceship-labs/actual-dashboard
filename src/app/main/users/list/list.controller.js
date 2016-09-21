(function ()
{
    'use strict';

    angular
        .module('app.users.list')
        .controller('UsersListController', UsersListController);

    /** @ngInject */
    function UsersListController(api, userService)
    {
        var vm = this;
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/users/edit/', propId: 'id'},
            {key:'email', label:'Email', actionUrl:'/users/edit/'},
            {key:'firstName', label:'Nombre'},
            {key:'lastName', label:'Apellidos'},
            {key:'role.name', label: 'Rol'}
        ];
        vm.apiResource = userService.getList;
    }

})();
