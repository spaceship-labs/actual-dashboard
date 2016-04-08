(function ()
{
    'use strict';

    angular
        .module('app.commissions', [
            'app.commissions.list',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        /*
        msNavigationServiceProvider.saveItem('commissions', {
            title : 'Comisiones',
            group : false,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('commissions.list', {
            title: 'Lista de Comisiones',
            state: 'app.commissions_list'
        });
        */
    }
})();
