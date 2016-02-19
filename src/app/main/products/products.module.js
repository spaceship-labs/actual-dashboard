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
            title : 'Products',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('products.list', {
            title: 'Lista de productos',
            state: 'app.products_list'
        });
    }
})();
