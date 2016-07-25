(function ()
{
    'use strict';

    angular
        .module('app.commissions.goals.edit', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.commissions_goals_edit', {
            url      : '/commissions/goals/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/commissions/goals/edit/edit.html',
                    controller : 'CommissionsGoalsEditController as vm'
                }
            },
            resolve  : {
            },
            bodyClass: 'edit',
            accessList:['admin'],
            moduleName: 'edit-goals',
        });
    }

})();
