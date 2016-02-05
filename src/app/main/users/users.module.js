(function ()
{
    'use strict';

    angular
        .module('app.users', [
            'app.users.list',
            'app.users.edit'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('users', {
            title : 'Users',
            group : false,
            weight: 2,
            state: 'app.users'
        });

        msNavigationServiceProvider.saveItem('users.list', {
            title: 'Lista de usuarios',
            state: 'app.users_list'
        });
    }
})();
