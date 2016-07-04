(function ()
{
    'use strict';

    angular
        .module('app.products.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_list', {
            url  : '/products',
            views: {
                'content@app': {
                    templateUrl: 'app/main/products/list/list.html',
                    controller : 'ProductsListController as vm'
                }
            },
            resolve: {
                /*Products: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'list-products',
        });
    }

})();
