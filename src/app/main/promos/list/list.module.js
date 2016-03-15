(function ()
{
    'use strict';

    angular
        .module('app.promos.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.promos_list', {
            url  : '/promos',
            views: {
                'content@app': {
                    templateUrl: 'app/main/promos/list/list.html',
                    controller : 'PromosListController as vm'
                }
            },
            resolve: {
                /*promos: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
        });
    }

})();
