(function ()
{
    'use strict';

    angular
        .module('app.commissions', [
            'app.commissions.list',
            'app.commissions.create',
            'app.commissions.edit',

            //METAS
            'app.commissions.goals.list',
            'app.commissions.goals.create',
            'app.commissions.goals.edit'

        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation

        msNavigationServiceProvider.saveItem('commissions', {
            title : 'Comisiones',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('commissions.list', {
            title: 'Lista de Comisiones',
            state: 'app.commissions_list'
        });

        msNavigationServiceProvider.saveItem('commissions.create', {
            title: 'Crear comisión',
            state: 'app.commissions_create'
        });


        msNavigationServiceProvider.saveItem('commissions.goals', {
            title : 'Metas',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('commissions.goals.list', {
            title: 'Lista de metas',
            state: 'app.commissions_goals_list'
        });

        msNavigationServiceProvider.saveItem('commissions.goals.create', {
            title: 'Crear meta',
            state: 'app.commissions_goals_create'
        });


    }
})();
