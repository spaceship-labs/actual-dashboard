(function ()
{
    'use strict';

    angular
        .module('app.users.create', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.users_create', {
            url      : '/users/create',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/users/create/create.html',
                    controller : 'UsersCreateController as vm'
                }
            },
            accessList: ['admin'],
            bodyClass: 'create',
            moduleName: 'create-users',
        });
    }

})();
