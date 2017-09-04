(function ()
{
    'use strict';

    angular
        .module('app.configuration.sites_edit')
        .controller('ConfigSitesEditController', ConfigSitesEditController);

    /** @ngInject */
    function ConfigSitesEditController($http, api, localStorageService, dialogService, siteService, $stateParams)
    {
        var vm = this;
        vm.isLoading = true;
        
        angular.extend(vm,{
          update:update
        });

        function init(){
          vm.isLoading = true;
          siteService.findByHandle($stateParams.handle)
            .then(function(res){
              vm.isLoading = false;
              vm.site = res.data;
              console.log('vm.site', vm.site);
            })
            .catch(function(err){
              console.log(err);
              vm.isLoading = false;
            });
        }

        function update(form, site){
          if(form.$valid){
            site.isLoading = true;
            siteService.update(site.handle, site)
              .then(function(res){
                console.log(res);
                site.isLoading = false;
                dialogService.showDialog('Datos actualizados');
              })
              .catch(function(err){
                site.isLoading = false;
                dialogService.showDialog('Hubo un error, revisa la información e intenta de nuevo');
              });
          }
        }

        init();
    }

})();
