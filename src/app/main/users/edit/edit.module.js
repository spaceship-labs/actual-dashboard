(function ()
{
    'use strict';

    angular
        .module('app.users.edit', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.users_edit', {
            url      : '/users/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/users/edit/edit.html',
                    controller : 'UsersEditController as vm'
                }
            },
            resolve  : {
            },
            bodyClass: 'edit',
            accessList:['admin'],
            moduleName: 'edit-users',
        });
    }

})();
