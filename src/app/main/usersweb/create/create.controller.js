(function ()
{
    'use strict';

    angular
        .module('app.usersweb.edit')
        .controller('UsersWebCreateController', UsersWebCreateController);

    /** @ngInject */
    function UsersWebCreateController(dialogService, userWebService, api){
        var vm = this;
        // Data
        vm.basicForm = {};
        vm.formWizard = {};
        vm.roles = [];
        vm.sendForm    = sendForm;
        
        init();


        function init() {
        }


        function sendForm(form){
          if(form.$valid){
            if(vm.basicForm.password === vm.basicForm.confirmPassword){
              vm.isLoading = true;
              userWebService.create(vm.user)
                .then(
                  function(res){
                    console.log(res);
                    vm.isLoading = false;
                    dialogService.showDialog('Datos guardados');
                  },
                  function(err){
                    console.log(err);
                    vm.isLoading = false;
                    var error = err.data || err;
                    error = error ? error.toString() : '';
                    dialogService.showDialog('Hubo un error: ' + error );          
                  }
                );
            }
          }else{
            var errors = [];
            if(form.$error.required){
              form.$error.required.forEach(function(err){
                errors.push(err.$name);
              });
            }
            dialogService.showErrorMessage('Campos incompletos', errors);
          }

            // Clear the form data
        }
 

    }
})();
