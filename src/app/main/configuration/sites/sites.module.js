(function ()
{
    'use strict';

    angular
        .module('app.configuration.sites', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.configuration_sites', {
            url  : '/configuration/sites',
            views: {
                'content@app': {
                    templateUrl: 'app/main/configuration/sites/sites.html',
                    controller : 'ConfigSitesController as vm'
                }
            },
            resolve: {
                /*configuration: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'config-sites',
        });
    }

})();
