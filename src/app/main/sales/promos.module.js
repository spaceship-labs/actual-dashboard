(function ()
{
    'use strict';

    angular
        .module('app.sales', [
            'app.sales.list',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('sales', {
            title : 'Ventas',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('sales.list', {
            title: 'Lista de Ventas',
            state: 'app.sales_list'
        });
    }
})();
