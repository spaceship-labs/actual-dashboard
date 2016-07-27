(function ()
{
    'use strict';

    angular
        .module('app.commissions.goals.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.commissions_goals_list', {
            url  : '/commissions/goals',
            views: {
                'content@app': {
                    templateUrl: 'app/main/commissions/goals/list/list.html',
                    controller : 'CommissionsGoalsListController as vm'
                }
            },
            resolve: {
                /*commissions: function (apiResolver)
                {
                    //return [];
                    return apiResolver.resolve('product.find@get');
                }*/
            },
            moduleName: 'list-goals',
        });
    }

})();
