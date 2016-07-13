(function ()
{
    'use strict';

    angular
        .module('app.marketing', [
            'app.marketing.list',
            'app.marketing.edit',
            'app.marketing.create'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('marketing', {
            title : 'Marketing',
            group : false,
            weight: 2,
            state: 'app.marketing'
        });

        msNavigationServiceProvider.saveItem('marketing.list', {
            title: 'Lista de promociones',
            state: 'app.marketing_list'
        });

        msNavigationServiceProvider.saveItem('marketing.create', {
            title: 'Crear promoción',
            state: 'app.marketing_create'
        });

    }
})();
