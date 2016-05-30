(function ()
{
    'use strict';

    angular
        .module('app.configuration.import')
        .controller('ConfigImportController', ConfigImportController);

    /** @ngInject */
    function ConfigImportController($http, api, localStorageService)
    {
        var vm = this;

        //vm.isImportingImages = localStorageService.get('isImportingImages');
        vm.isImportingImages = false;

        // Methods
        //////////
        vm.importImagesSap = importImagesSap;


        function importImagesSap(){
          if(!vm.isImportingImages){

            //localStorageService.set('isImportingImages', true);
            //vm.isImportingImages = localStorageService.get('isImportingImages');
            vm.isImportingImages = true;

            $http.post(api.baseUrl + '/import/importimagessap').then(function(res){
              console.log(res);
              vm.isImportingImages = false;
            });

          }
        }
    }

})();
