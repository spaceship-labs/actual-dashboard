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

            // Sample
            'app.sample',

            // Pages
            'app.pages',

            // Auth
            'app.auth',

            // Auth
            'app.products',


            //CUSTOM EXTERNAL MODULES
            'LocalStorageModule'
        ]);
})();
