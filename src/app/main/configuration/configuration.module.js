(function ()
{
    'use strict';

    angular
        .module('app.configuration', [
            'app.configuration.import',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('configuration.import', {
            title: 'Importar datos',
            state: 'app.configuration_import'
        });
        /*
        msNavigationServiceProvider.saveItem('configuration', {
            title : 'configuration',
            group : false,
            weight: 2
        });

*/
    }
})();
