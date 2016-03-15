(function ()
{
    'use strict';

    angular
        .module('app.auth.reset-password', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.auth_reset-password', {
            url      : '/auth/reset-password?token&email',
            views    : {
                'main@'                                : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.auth_reset-password': {
                    templateUrl: 'app/main/auth/reset-password/reset-password.html',
                    controller : 'ResetPasswordController as vm'
                }
            },
            bodyClass: 'reset-password',
            isPublic: true
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/auth/reset-password');

        // Navigation
        /*
        msNavigationServiceProvider.saveItem('auth.reset-password', {
            title : 'Reset Password',
            state : 'app.auth_reset-password',
            weight: 6
        });
        */
    }

})();
