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

        // Data
        vm.columns = [
            {key:'email', label:'Email', actionUrl:'/users/edit/'},
            {key:'firstName', label:'First Name'},
            {key:'lastName', label:'Last name'},
            {key:'userType', label: 'Role'}
        ];

        //vm.apiResource = api.user.find.get;
        vm.apiResource = userService.getList;
        // Methods

        //////////
    }

})();
