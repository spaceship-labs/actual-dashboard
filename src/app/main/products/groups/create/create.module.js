(function ()
{
    'use strict';

    angular
        .module('app.products.groups.create', ['ngFileUpload'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_groups_create', {
            url      : '/products/groups/create',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/groups/create/create.html',
                    controller : 'ProductGroupsCreateController as vm'
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
            moduleName: 'create-groups',
        });
    }

})();
