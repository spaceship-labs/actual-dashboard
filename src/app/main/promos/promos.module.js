(function ()
{
    'use strict';

    angular
        .module('app.promos', [
            'app.promos.list',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('promos', {
            title : 'Promociones',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('promos.list', {
            title: 'Lista de Promociones',
            state: 'app.promos_list'
        });
    }
})();
