(function ()
{
    'use strict';

    angular
        .module('app.products.filters.edit', ['ngMessages'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_filters_edit', {
            url      : '/products/filters/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/filters/edit/edit.html',
                    controller : 'ProductFiltersEditController as vm'
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
            moduleName: 'edit-filters',
        });
    }

})();
