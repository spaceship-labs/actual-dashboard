(function ()
{
    'use strict';

    angular
        .module('app.products.categories.create', ['ngFileUpload'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_categories_create', {
            url      : '/products/categories/create/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/categoriescreate/categoriescreate.html',
                    controller : 'ProductCategoriesCreateController as vm'
                }
            },
            resolve  : {
              /*Product: function (apiResolver, $stateParams){
                return apiResolver.resolve('product.getById@get',{'id': $stateParams.id});
              }
              */
            },
            bodyClass: 'edit',
            accessList:['admin']
        });
    }

})();