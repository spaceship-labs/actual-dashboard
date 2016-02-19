(function ()
{
    'use strict';

    angular
        .module('app.users.list')
        .controller('UsersListController', UsersListController);

    /** @ngInject */
    function UsersListController(Users, api)
    {
        var vm = this;

        // Data
        vm.columns = [
            {key:'email', label:'Email', link:'/user/edit/'},
            {key:'firstName', label:'First Name'},
            {key:'lastName', label:'Last name'},
        ];

        vm.actionUrl = {value:'/users/edit/',col:0}

        vm.apiResource = api.user.find.get;
        // Methods

        //////////
    }

})();
