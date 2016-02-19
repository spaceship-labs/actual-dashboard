(function ()
{
    'use strict';

    angular
        .module('app.products.view', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_view', {
            url      : '/products/view/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/view/view.html',
                    controller : 'ProductViewController as vm'
                }
            },
            resolve  : {
              Product: function (apiResolver, $stateParams){
                return apiResolver.resolve('product.getById@get',{'id': $stateParams.id});
              }
            },
            bodyClass: 'view',
            accessList:['admin']
        });
    }

})();
