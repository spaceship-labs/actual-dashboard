(function ()
{
    'use strict';

    angular
        .module('app.configuration', [
            'app.configuration.import',
            'app.configuration.sync',
            'app.configuration.sites',
            'app.configuration.contability',
            'app.configuration.delivery'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        
        msNavigationServiceProvider.saveItem('configuration.import', {
            title: 'Importar imagenes SAP',
            state: 'app.configuration_import'
        });
        

        msNavigationServiceProvider.saveItem('configuration.sync', {
            title: 'Sincronizar productos',
            state: 'app.configuration_sync'
        });

        msNavigationServiceProvider.saveItem('configuration.sites', {
            title: 'Configuración de sitio',
            state: 'app.configuration_sites'
        });

        msNavigationServiceProvider.saveItem('configuration.contability', {
            title: 'Configuración de contabilidad',
            state: 'app.configuration_contability'
        });

        msNavigationServiceProvider.saveItem('configuration.delivery', {
            title: 'Configuración de envios',
            state: 'app.configuration_delivery'
        });

        msNavigationServiceProvider.saveItem('configuration', {
            title : 'Configuracion',
            group : false,
            weight: 2
        });
    }
})();
