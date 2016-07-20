(function ()
{
    'use strict';

    angular
        .module('app.commissions.goals.create', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.commissions_goals_create', {
            url      : '/commissions/goals/create',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/commissions/goals/create/create.html',
                    controller : 'CommissionsGoalsCreateController as vm'
                }
            },
            accessList: ['admin'],
            bodyClass: 'create',
            moduleName: 'create-goals',
        });
    }

})();
