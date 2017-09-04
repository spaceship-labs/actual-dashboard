(function ()
{
    'use strict';

    angular
        .module('app.configuration.sites_edit', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.configuration_sites_edit', {
            url  : '/configuration/sites/edit/:handle',
            views: {
                'content@app': {
                    templateUrl: 'app/main/configuration/sites/edit/edit.html',
                    controller : 'ConfigSitesEditController as vm'
                }
            },
            resolve: {
                /*configuration: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'config-sites-edit',
        });
    }

})();
