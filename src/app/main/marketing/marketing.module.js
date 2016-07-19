(function ()
{
    'use strict';

    angular
        .module('app.marketing', [
            'app.marketing.list',
            'app.marketing.edit',
            'app.marketing.create',

            //Payment methods
            'app.marketing.pm.list',
            'app.marketing.pm.edit',
            'app.marketing.pm.create'

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


        msNavigationServiceProvider.saveItem('marketing.pm', {
            title: 'Metodos de pago',
            group: true
        });

        msNavigationServiceProvider.saveItem('marketing.pm.list', {
            title: 'Lista de vigencias de pago',
            state: 'app.marketing_pm_list'
        });


        msNavigationServiceProvider.saveItem('marketing.pm.create', {
            title: 'Crear vigencia de formas pago',
            state: 'app.marketing_pm_create'
        });

    }
})();
