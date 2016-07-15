(function ()
{
    'use strict';

    angular
        .module('app.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController(api, $http){

        var vm = this;

        // Data
        vm.isLoading = false;
        vm.message = '';

        // Methods

        vm.sendPasswordRecovery = sendPasswordRecovery;

        function sendPasswordRecovery(){
          vm.isLoading = true;
          var url = api.baseUrl + '/user/send_password_recovery';
          var data = {email: vm.form.email};

          $http.post(url, data).then(function(res){
            console.log(res);
            vm.isLoading = false;
            if(res.data.success){
              vm.processCompleted = true;
              vm.message = 'Se ha enviado un enlace a tu email para reestablecer tu contraseña';
            }else{
              vm.message = 'Hubo un error, intenta de nuevo';
            }
          },function(err){
            vm.isLoading = false;
            vm.message = 'Hubo un error, intenta de nuevo';
            console.log(err)
          });

        }

        //////////
    }
})();
