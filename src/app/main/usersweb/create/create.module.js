(function ()
{
    'use strict';

    angular
        .module('app.usersweb.create', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.usersweb_create', {
            url      : '/usersweb/create',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/usersweb/create/create.html',
                    controller : 'UsersWebCreateController as vm'
                }
            },
            accessList: ['admin'],
            bodyClass: 'create',
            moduleName: 'create-users-web',
        });
    }

})();
