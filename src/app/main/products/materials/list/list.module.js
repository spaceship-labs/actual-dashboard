(function ()
{
    'use strict';

    angular
        .module('app.products.materials.list',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_materials_list', {
            url      : '/products/materials/list',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/materials/list/list.html',
                    controller : 'ProductMaterialsListController as vm'
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
