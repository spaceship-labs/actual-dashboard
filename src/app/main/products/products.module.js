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
            'app.products.categories.edit-relations',

            'app.products.filters.list',
            'app.products.filters.create',
            'app.products.filters.edit',

            'app.products.materials.list',

            'app.products.groups.list',
            'app.products.groups.create',
            'app.products.groups.edit',

            'app.products.brands.list',
            'app.products.brands.create',
            'app.products.brands.edit',


        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('products', {
            title : 'Articulos',
            group : true,
            weight: 3
        });


        msNavigationServiceProvider.saveItem('products.filters', {
            title: 'Filtros',
            group: true
        });

        msNavigationServiceProvider.saveItem('products.categories', {
            title: 'Categorias',
            group: true
        });

        msNavigationServiceProvider.saveItem('products.brands', {
            title: 'Marcas',
            group: true
        });

        msNavigationServiceProvider.saveItem('products.groups', {
            title: 'Agrupadores',
            group: true
        });


        msNavigationServiceProvider.saveItem('products.list', {
            title: 'Lista de articulos',
            state: 'app.products_list'
        });

        msNavigationServiceProvider.saveItem('products.categories.list', {
            title: 'Categorias de productos',
            state: 'app.products_categories_list'
        });
        /*
        msNavigationServiceProvider.saveItem('products.categories.create', {
            title: 'Crear categoria',
            state: 'app.products_categories_create'
        });
        */

        msNavigationServiceProvider.saveItem('products.filters.list', {
            title: 'Filtros de productos',
            state: 'app.products_filters_list'
        });


        msNavigationServiceProvider.saveItem('products.filters.create', {
            title: 'Crear filtro',
            state: 'app.products_filters_create'
        });


        msNavigationServiceProvider.saveItem('products.groups.create', {
            title: 'Crear agrupador',
            state: 'app.products_groups_create'
        });


        msNavigationServiceProvider.saveItem('products.groups.list', {
            title: 'Agrupadores',
            state: 'app.products_groups_list'
        });

        msNavigationServiceProvider.saveItem('products.brands.list', {
            title: 'Marcas de productos',
            state: 'app.products_brands_list'
        });


    }
})();
