(function ()
{
    'use strict';

    angular
        .module('app.configuration.delivery', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.configuration_delivery', {
            url  : '/configuration/delivery',
            views: {
                'content@app': {
                    templateUrl: 'app/main/configuration/delivery/delivery.html',
                    controller : 'ConfigDeliveryController as vm'
                }
            },
            resolve: {
                /*configuration: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'config-delivery',
        });
    }

})();
