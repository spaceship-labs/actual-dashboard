(function ()
{
    'use strict';

    angular
        .module('app.commissions', [
            'app.commissions.reports',
            'app.commissions.list',
            'app.commissions.create',
            'app.commissions.edit',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {

        msNavigationServiceProvider.saveItem('commissions', {
            title : 'Comisiones',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('commissions.reports', {
            title: 'Reportes',
            state: 'app.commissions_reports'
        });

        msNavigationServiceProvider.saveItem('commissions.list', {
            title: 'Lista de Comisiones',
            state: 'app.commissions_list'
        });

        msNavigationServiceProvider.saveItem('commissions.create', {
            title: 'Crear comisión',
            state: 'app.commissions_create'
        });
    }
})();
