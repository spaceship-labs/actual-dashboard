(function ()
{
    'use strict';

    angular
        .module('app.configuration.contability', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.configuration_contability', {
            url  : '/configuration/contability',
            views: {
                'content@app': {
                    templateUrl: 'app/main/configuration/contability/contability.html',
                    controller : 'ConfigContabilityController as vm'
                }
            },
            resolve: {
                /*configuration: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'config-contability',
        });
    }

})();
