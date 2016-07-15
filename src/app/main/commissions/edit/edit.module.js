(function ()
{
    'use strict';

    angular
        .module('app.commissions.edit', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.commissions_edit', {
            url      : '/commissions/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/users/edit/edit.html',
                    controller : 'CommissionsEditController as vm'
                }
            },
            resolve  : {
            },
            bodyClass: 'edit',
            accessList:['admin'],
            moduleName: 'edit-commissions',
        });
    }

})();
