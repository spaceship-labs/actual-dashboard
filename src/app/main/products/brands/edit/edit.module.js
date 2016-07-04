(function ()
{
    'use strict';

    angular
        .module('app.products.brands.edit',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_brands_edit', {
            url      : '/products/brands/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/brands/edit/edit.html',
                    controller : 'ProductBrandsEditController as vm'
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
            moduleName: 'edit-brands',
        });
    }

})();
