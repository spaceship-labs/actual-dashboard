(function ()
{
    'use strict';

    angular
        .module('app.configuration.import', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.configuration_import', {
            url  : '/configuration/import',
            views: {
                'content@app': {
                    templateUrl: 'app/main/configuration/import/import.html',
                    controller : 'ConfigImportController as vm'
                }
            },
            resolve: {
                /*configuration: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'import-images',
        });
    }

})();
