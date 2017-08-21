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
            //'app.sample',

            // Pages
            'app.pages',

            // Auth
            'app.auth',

            // Products
            'app.products',

            // Users
            'app.users',

            // UsersWeb
            'app.usersweb',

            // leads
            //'app.leads',

            //Commissions
            'app.commissions',

            //Invoices
            //'app.invoices',

            //Ventas
            //'app.sales',

            //Configuracion
            'app.configuration',

            //Marketing
            'app.marketing',

            //Pagina de accceso denegado
            'app.accesdenied',

            //CUSTOM EXTERNAL MODULES
            'LocalStorageModule',
            'angular-jwt',
            'bw.paging',
            'dndLists',
            'ngMaterialDatePicker',
            'ui.tinymce',
            'pikaday',
            'ui.timepicker',
            'bcherny/formatAsCurrency',
            'ngCsv',
            'envconfig',
        ]);
})();
