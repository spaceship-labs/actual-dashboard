(function ()
{
    'use strict';

    angular
        .module('app.usersweb.list', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.usersweb_list', {
            url  : '/usersweb',
            views: {
                'content@app': {
                    templateUrl: 'app/main/usersweb/list/list.html',
                    controller : 'UsersWebListController as vm'
                }
            },
            resolve: {
            },
            moduleName: 'list-users-web',
        });
    }

})();
