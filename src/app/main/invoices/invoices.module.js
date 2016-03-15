(function ()
{
    'use strict';

    angular
        .module('app.invoices', [
            'app.invoices.list',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('invoices', {
            title : 'Facturas',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('invoices.list', {
            title: 'Lista de Facturas',
            state: 'app.invoices_list'
        });
    }
})();
