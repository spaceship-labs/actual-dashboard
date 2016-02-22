(function ()
{
    'use strict';

    angular
        .module('app.products.search', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_search', {
            url  : '/products/search',
            views: {
                'content@app': {
                    templateUrl: 'app/main/products/search/search.html',
                    controller : 'ProductsSearchController as vm'
                }
            },
            resolve: {
                Lines: function (apiResolver){
                    return apiResolver.resolve('line.find@get');
                },
                Color: function (apiResolver){
                    return apiResolver.resolve('color.find@get');
                }

            },
        });
    }

})();
