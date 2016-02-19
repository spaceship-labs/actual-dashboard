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
            title : 'Leads',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('leads.list', {
            title: 'Leads list',
            state: 'app.leads_list'
        });
    }
})();
