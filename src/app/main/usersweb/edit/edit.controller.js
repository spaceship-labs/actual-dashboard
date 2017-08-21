(function ()
{
    'use strict';

    angular
        .module('app.usersweb.edit')
        .controller('UsersWebEditController', UsersWebEditController);

    /** @ngInject */
    function UsersWebEditController($mdDialog, $stateParams, userWebService, api, dialogService){
        var vm      = this;
        var sending = false;
        vm.basicForm = {};
        vm.formWizard = {};
        vm.isLoading = false;

        // Methods
        vm.sendForm          = sendForm;
        vm.toggleStore     = toggleStore;
        vm.isStoreSelected = isStoreSelected;

        function isStoreSelected(id) {
          if(!vm.user){
            return false;
          }
          return vm.user.Stores.indexOf(id) !== -1;
        }
        function toggleStore(id) {
          if(vm.user){
            if (isStoreSelected(id)) {
              vm.user.Stores = vm.user.Stores.filter(function(comp){
                return comp != id;
              });
            } else  {
              vm.user.Stores = vm.user.Stores.concat(id);
            }
          }
        }

        init();

        //////////

        function init(){
          userWebService.getUser($stateParams.id).then(function(res){
            vm.user           = res.data.data;
            return vm.user;
          }).then(function(user){
            console.log('user',user);
          });

        }

        /**
         * Send form
         */
        function sendForm(form){
          if (sending) {
            return;
          }
          sending = true;
          if(form.$valid){
            var params = vm.user;

            vm.isLoading = true;
            userWebService.update(vm.user.id, params)
              .then(
                function(res){
                  sending = false;
                  dialogService.showDialog('Datos guardados');
                  // Clear the form data
                  vm.formWizard = {};
                  vm.isLoading = false;
                },
                function(errUpdate){
                  sending = false;
                  console.log(errUpdate);
                  var error = errUpdate.data || errUpdate;
                  error = error ? error.toString() : '';
                  dialogService.showDialog('Hubo un error: ' + error );          
                  vm.isLoading = false;
                }
            );

          }else{
            var errors = [];
            sending = false;
            if(form.$error.required){
              form.$error.required.forEach(function(err){
                errors.push(err.$name);
              });
            }
            dialogService.showErrorMessage('Campos incompletos', errors);
          }


        }

    }
})();
