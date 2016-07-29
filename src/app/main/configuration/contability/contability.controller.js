(function ()
{
    'use strict';

    angular
        .module('app.configuration.contability')
        .controller('ConfigContabilityController', ConfigContabilityController);

    /** @ngInject */
    function ConfigContabilityController($http, api, localStorageService, siteService, dialogService)
    {
        var vm = this;
        angular.extend(vm,{
          init: init,
          update:update
        });

        function init(){
          vm.isLoading = true;
          siteService.findByHandle('actual-group').then(function(res){
            vm.isLoading = false;
            vm.site = res.data;
          });
        }

        function update(form){
          if(form.$valid){
            vm.isLoading = true;
            siteService.update('actual-group', vm.site).then(function(res){
              console.log(res);
              vm.isLoading = false;
              dialogService.showDialog('Datos actualizados');
            }).catch(function(err){
              vm.isLoading = false;
              dialogService.showDialog('Hubo un error, revisa la información e intenta de nuevo');
            });
          }
        }

        vm.init();
    }

})();
