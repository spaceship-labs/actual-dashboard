(function ()
{
    'use strict';

    angular
        .module('app.products', [
            'app.products.list',
            'app.products.view',
            'app.products.search',
            'app.products.edit',

            'app.products.categories.list',
            'app.products.categories.create',
            'app.products.categories.edit',

            'app.products.filters.list',
            'app.products.filters.create',
            'app.products.filters.edit'


        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('products', {
            title : 'Productos',
            group : false,
            weight: 2
        });


        msNavigationServiceProvider.saveItem('products.filters', {
            title: 'Filtros',
            group: false
        });

        msNavigationServiceProvider.saveItem('products.categories', {
            title: 'Categorias',
            group: false
        });


        msNavigationServiceProvider.saveItem('products.list', {
            title: 'Lista de productos',
            state: 'app.products_list'
        });

        msNavigationServiceProvider.saveItem('products.categories.list', {
            title: 'Categorias de productos',
            state: 'app.products_categories_list'
        });
        msNavigationServiceProvider.saveItem('products.categories.create', {
            title: 'Crear categoria',
            state: 'app.products_categories_create'
        });

        msNavigationServiceProvider.saveItem('products.filters.list', {
            title: 'Filtros de productos',
            state: 'app.products_filters_list'
        });

        msNavigationServiceProvider.saveItem('products.filters.create', {
            title: 'Crear filtro',
            state: 'app.products_filters_create'
        });

    }
})();
