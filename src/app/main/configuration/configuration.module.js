(function ()
{
    'use strict';

    angular
        .module('app.configuration', [
            'app.configuration.import',
            'app.configuration.sites',
            'app.configuration.contability'
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

        msNavigationServiceProvider.saveItem('configuration.sites', {
            title: 'Configuración de sitio',
            state: 'app.configuration_sites'
        });

        msNavigationServiceProvider.saveItem('configuration.contability', {
            title: 'Configuración de coontabilidad',
            state: 'app.configuration_contability'
        });

        msNavigationServiceProvider.saveItem('configuration', {
            title : 'Configuracion',
            group : false,
            weight: 2
        });
    }
})();
