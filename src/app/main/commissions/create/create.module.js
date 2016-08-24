(function ()
{
    'use strict';

    angular
        .module('app.commissions.create', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.commissions_create', {
            url      : '/commissions/create',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/commissions/create/create.html',
                    controller : 'CommissionsCreateController as vm'
                }
            },
            accessList: ['admin'],
            bodyClass: 'create',
            moduleName: 'create-commissions',
        });
    }
})();
