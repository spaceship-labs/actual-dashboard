(function ()
{
    'use strict';

    angular
        .module('app.users.list')
        .controller('UsersListController', UsersListController);

    /** @ngInject */
    function UsersListController(Users)
    {
        var vm = this;

        // Data
        vm.employees = Users;

        vm.dtOptions = {
            dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth : false,
            responsive: true
        };
        // Methods

        //////////
    }

})();
