(function ()
{
    'use strict';

    angular
        .module('app.products.brands.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_brands_list', {
            url  : '/products/brands',
            views: {
                'content@app': {
                    templateUrl: 'app/main/products/brands/list/list.html',
                    controller : 'ProductsBrandListController as vm'
                }
            },
            resolve: {
                /*Products: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'list-brands',
        });
    }

})();
