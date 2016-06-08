(function ()
{
    'use strict';

    angular
        .module('app.products.view', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.products_view', {
            url      : '/products/view/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/products/view/view.html',
                    controller : 'ProductViewController as vm'
                }
            },
            resolve  : {
            },
            bodyClass: 'view',
            accessList:['admin','content-editor']
        });
    }

})();
