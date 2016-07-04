(function ()
{
    'use strict';

    angular
        .module('app.products.brands.create', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_brands_create', {
            url      : '/products/brands/create',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/brands/create/create.html',
                    controller : 'ProductBrandCreateController as vm'
                }
            },
            resolve  : {
              /*Product: function (apiResolver, $stateParams){
                return apiResolver.resolve('product.getById@get',{'id': $stateParams.id});
              }
              */
            },
            bodyClass: 'edit',
            accessList:['admin','content-editor'],
            moduleName: 'create-brands',
        });
    }

})();
