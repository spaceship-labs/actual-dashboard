(function ()
{
    'use strict';

    angular
        .module('app.configuration.sync', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.configuration_sync', {
            url  : '/configuration/sync',
            views: {
                'content@app': {
                    templateUrl: 'app/main/configuration/sync/sync.html',
                    controller : 'ConfigSyncController as vm'
                }
            },
            resolve: {
                /*configuration: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'config-sync',
        });
    }

})();
