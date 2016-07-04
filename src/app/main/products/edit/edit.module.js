(function ()
{
    'use strict';

    angular
        .module('app.products.edit', ['ngFileUpload'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_edit', {
            url      : '/products/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/edit/edit.html',
                    controller : 'ProductEditController as vm'
                }
            },
            resolve  : {
              /*Product: function (apiResolver, $stateParams){
                return apiResolver.resolve('product.getById@get',{'id': $stateParams.id});
              }
              */
            },
            bodyClass: 'edit',
            moduleName: 'edit-products',
            accessList:['admin','content-editor']
        });
    }

})();
