(function ()
{
    'use strict';

    angular
        .module('app.products.categories.edit-relations',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_categories_edit_relations', {
            url      : '/products/categories/edit-relations/:handle',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/categories/edit-relations/edit-relations.html',
                    controller : 'EditRelationsController as vm'
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
