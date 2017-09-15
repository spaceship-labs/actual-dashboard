(function ()
{
    'use strict';

    angular
        .module('app.configuration.sites')
        .controller('ConfigSitesController', ConfigSitesController);

    /** @ngInject */
    function ConfigSitesController($http, api, localStorageService, dialogService, siteService)
    {
        var vm = this;
        vm.columns = [
            {key:'Edit', label:'Editar', editUrl:'/configuration/sites/edit/', propId: 'handle'},
            {key:'name', label:'Nombre',actionUrl:'/configuration/sites/edit/', propId: 'handle'}
        ];
        vm.apiResource = siteService.find;

        var vm = this;
        angular.extend(vm,{
          update:update
        });

        function init(){
          vm.isLoading = true;
          siteService.getAll()
            .then(function(res){
              vm.isLoading = false;
              vm.sites = res.data;
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
