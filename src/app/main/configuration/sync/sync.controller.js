(function ()
{
    'use strict';

    angular
        .module('app.configuration.sync')
        .controller('ConfigSyncController', ConfigSyncController);

    /** @ngInject */
    function ConfigSyncController($http, api, localStorageService, productService)
    {
        var vm = this;
        angular.extend(vm,{
            syncProduct: syncProduct
        });
        // Methods
        //////////

        function syncProduct(){
            console.log('syncProduct');
        }

    }

})();
