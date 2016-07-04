(function ()
{
    'use strict';

    angular
        .module('app.products.groups.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_groups_list', {
            url  : '/products/groups',
            views: {
                'content@app': {
                    templateUrl: 'app/main/products/groups/list/list.html',
                    controller : 'ProductsGroupsListController as vm'
                }
            },
            resolve: {
                /*Products: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'list-groups',
        });
    }

})();
