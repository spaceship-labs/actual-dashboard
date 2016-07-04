(function ()
{
    'use strict';

    angular
        .module('app.accesdenied', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.accesdenied', {
            url  : '/accessdenied',
            views: {
                'content@app': {
                    templateUrl: 'app/main/pages/denied/denied.html',
                    controller : 'AccessDeniedController as vm'
                }
            },
            resolve: {
            },
            moduleName: 'access-denied',
        });
    }

})();
