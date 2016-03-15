(function ()
{
    'use strict';

    angular
        .module('app.users', [
            'app.users.list',
            'app.users.edit',
            'app.users.create'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('users', {
            title : 'Usarios',
            group : false,
            weight: 2,
            state: 'app.users'
        });

        msNavigationServiceProvider.saveItem('users.list', {
            title: 'Lista de usuarios',
            state: 'app.users_list'
        });

        msNavigationServiceProvider.saveItem('users.create', {
            title: 'Registrar usuarios',
            state: 'app.users_create'
        });

    }
})();
