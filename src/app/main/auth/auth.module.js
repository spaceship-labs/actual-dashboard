(function ()
{
    'use strict';

    angular
        .module('app.auth', [
            'app.auth.login',
            'app.auth.register',
            'app.auth.reset-password',
            'app.auth.forgot-password'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        /*
        msNavigationServiceProvider.saveItem('auth', {
            title : 'Auth',
            group : false,
            weight: 2
        });
*/
    }
})();
