(function ()
{
    'use strict';

    angular
        .module('app.usersweb', [
            'app.usersweb.list',
            'app.usersweb.edit',
            'app.usersweb.create'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('usersweb', {
            title : 'Usarios Web',
            group : false,
            weight: 2,
            state: 'app.usersweb'
        });

        msNavigationServiceProvider.saveItem('usersweb.list', {
            title: 'Lista de usuarios web',
            state: 'app.usersweb_list'
        });

        msNavigationServiceProvider.saveItem('usersweb.create', {
            title: 'Registrar usuario web',
            state: 'app.usersweb_create'
        });

    }
})();
