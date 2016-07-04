(function ()
{
    'use strict';

    angular
        .module('app.products.categories.edit',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_categories_edit', {
            url      : '/products/categories/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/categories/edit/edit.html',
                    controller : 'ProductCategoriesEditController as vm'
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
            moduleName: 'edit-categories',
        });
    }

})();
