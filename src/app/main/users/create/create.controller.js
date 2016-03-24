(function ()
{
    'use strict';

    angular
        .module('app.users.edit')
        .controller('UsersCreateController', UsersCreateController);

    /** @ngInject */
    function UsersCreateController(dialogService, userService){
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

        vm.roles = [
          {'name':'Admin', id:1, handle:'admin'},
          {'name':'Seller', id:2, handle:'seller'},
          {'name':'Broker', id:3, handle:'broker'}
        ];

        // Methods
        vm.sendForm = sendForm;
        vm.getUsersSap = getUsersSap;

        //////////

        vm.getUsersSap();

        /**
         * Send form
         */
        function sendForm(ev){
          console.log(vm.basicForm);
          if(vm.basicForm.password === vm.basicForm.confirmPassword){
              vm.isLoading = true;
              userService.create(vm.user)
                .then(
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

        function getUsersSap(){
          userService.getUsersSap().then(function(res){
            vm.usersSap = res.data.data;
          })
        }

    }
})();
