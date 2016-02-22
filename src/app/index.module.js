(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            //DIRECTIVES
            'app.directives',

            //Services
            'app.services',

            // Sample
            'app.sample',

            // Pages
            'app.pages',

            // Auth
            'app.auth',

            // Products
            'app.products',

            // Users
            'app.users',

            // leads
            'app.leads',

            //CUSTOM EXTERNAL MODULES
            'LocalStorageModule',
            'angular-jwt',
            'bw.paging'
        ]);
})();
