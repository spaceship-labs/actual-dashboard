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
        vm.results = [];

        // Methods
        //////////
        vm.importImagesSap = importImagesSap;
        vm.syncProducts = syncProducts;


        function syncProducts(){
          var url = '/sync/products';
          vm.isLoadingProducts = true;
          console.log('syncProducts');
          api.$http.post(url).then(function(res){
            console.log(res);
            vm.isLoadingProducts = false;
          }).catch(function(err){
            console.log(err);
            vm.isLoadingProducts = false;
          });
        }

        function importImagesSap(){
          if(!vm.isImportingImages){

            //localStorageService.set('isImportingImages', true);
            //vm.isImportingImages = localStorageService.get('isImportingImages');
            vm.isImportingImages = true;

            var req = {
              method: 'POST',
              url: api.baseUrl + '/import/importimagessap',
              data: {limit: vm.productsNum}
            };
            $http(req).then(function(res){
              console.log(res);
              vm.isImportingImages = false;
              vm.results = res.data;
              vm.exportQuery = 'SELECT ItemCode AS Codigo, status INTO XLS("fotos-importadas.xls",{headers:true}) FROM ?';
              alasql(vm.exportQuery ,[vm.results]);
            });

          }
        }
    }

})();
