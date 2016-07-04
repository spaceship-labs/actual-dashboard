(function ()
{
    'use strict';

    angular
        .module('app.products.filters.create', ['ngFileUpload'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_filters_create', {
            url      : '/products/filters/create',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/filters/create/create.html',
                    controller : 'ProductFiltersCreateController as vm'
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
            moduleName: 'create-filters',
        });
    }

})();
