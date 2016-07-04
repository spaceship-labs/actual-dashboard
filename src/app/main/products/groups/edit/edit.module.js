(function ()
{
    'use strict';

    angular
        .module('app.products.groups.edit', ['ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_groups_edit', {
            url      : '/products/groups/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/groups/edit/edit.html',
                    controller : 'ProductGroupsEditController as vm'
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
            moduleName: 'edit-groups',
        });
    }

})();
