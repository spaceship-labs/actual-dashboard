(function ()
{
    'use strict';

    angular
        .module('app.leads', [
            'app.leads.list',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('leads', {
            title : 'Oportunidades',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('leads.list', {
            title: 'Lista de Oportunidades',
            state: 'app.leads_list'
        });
    }
})();
