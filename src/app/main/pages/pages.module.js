(function ()
{
    'use strict';

    angular
        .module('app.pages', [
            'app.pages.coming-soon',
            'app.pages.error-404',
            'app.pages.error-500',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('pages', {
            title : 'PAGES',
            group : true,
            weight: 2
        });
    }
})();
