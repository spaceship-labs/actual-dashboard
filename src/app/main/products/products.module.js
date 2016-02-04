(function ()
{
    'use strict';

    angular
        .module('app.products', [
            'app.products.list',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('products', {
            title : 'PRODUCTS',
            group : true,
            weight: 2
        });
    }
})();
