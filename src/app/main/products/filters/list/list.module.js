(function ()
{
    'use strict';

    angular
        .module('app.products.filters.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_filters_list', {
            url  : '/products/filters',
            views: {
                'content@app': {
                    templateUrl: 'app/main/products/filters/list/list.html',
                    controller : 'ProductsFiltersListController as vm'
                }
            },
            resolve: {
                /*Products: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'list-filters',
        });
    }

})();
