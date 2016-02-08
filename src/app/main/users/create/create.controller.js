(function ()
{
    'use strict';

    angular
        .module('app.users.edit')
        .controller('UsersCreateController', UsersCreateController);

    /** @ngInject */
    function UsersCreateController(dialogService, api){
        var vm = this;

        // Data
        vm.user = {};
        vm.basicForm = {};
        vm.formWizard = {};

        vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function (state)
        {
            return {abbrev: state};
        });

        // Methods
        vm.sendForm = sendForm;

        //////////

        /**
         * Send form
         */
        function sendForm(ev){
          console.log(vm.basicForm);
          if(vm.basicForm.password === vm.basicForm.confirmPassword){
              vm.isLoading = true;
              api.user.create.create(vm.user,
                function(res){
                  console.log(res);
                  vm.isLoading = true;
                  dialogService.showDialog('Datos guardados',ev);
                },
                function(err){
                  console.log(err);
                  vm.isLoading = false;
                  dialogService.showDialog('Error, intenta de nuevo',ev);
                }
              );
          }

            // Clear the form data
        }

    }
})();
