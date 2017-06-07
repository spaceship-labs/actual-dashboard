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
            'app.marketing.pm.create',

            //Packages
            'app.marketing.packages.list',
            'app.marketing.packages.edit',

            //Spotlight
            'app.marketing.spotlight',

            //Slowmovement
            'app.marketing.slowmovement'

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
        });


        msNavigationServiceProvider.saveItem('marketing.spotlight', {
            title: 'MiActual Recomienda',
            state: 'app.marketing_spotlight'
        });            

        msNavigationServiceProvider.saveItem('marketing.slowmovement', {
            title: 'Oportunidades (LM)',
            state: 'app.marketing_slowmovement'
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

        msNavigationServiceProvider.saveItem('marketing.packages', {
            title: 'Paquetes',
            group: true
        });

        msNavigationServiceProvider.saveItem('marketing.packages.list', {
            title: 'Lista de paquetes',
            state: 'app.marketing_packages_list'
        });
    

    }
})();
