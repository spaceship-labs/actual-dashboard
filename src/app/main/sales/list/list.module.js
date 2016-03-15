(function ()
{
    'use strict';

    angular
        .module('app.sales.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.sales_list', {
            url  : '/sales',
            views: {
                'content@app': {
                    templateUrl: 'app/main/sales/list/list.html',
                    controller : 'PromosListController as vm'
                }
            },
            resolve: {
                /*sales: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
        });
    }

})();
