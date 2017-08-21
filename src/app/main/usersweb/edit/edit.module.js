(function ()
{
    'use strict';

    angular
        .module('app.usersweb.edit', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.usersweb_edit', {
            url      : '/usersweb/edit/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/usersweb/edit/edit.html',
                    controller : 'UsersWebEditController as vm'
                }
            },
            resolve  : {
            },
            bodyClass: 'edit',
            accessList:['admin'],
            moduleName: 'edit-users-web',
        });
    }

})();
