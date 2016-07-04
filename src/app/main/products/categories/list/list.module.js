(function ()
{
    'use strict';

    angular
        .module('app.products.categories.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_categories_list', {
            url  : '/products/categories',
            views: {
                'content@app': {
                    templateUrl: 'app/main/products/categories/list/list.html',
                    controller : 'ProductsCategoriesListController as vm'
                }
            },
            resolve: {
                /*Products: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'list-categories',
        });
    }

})();
